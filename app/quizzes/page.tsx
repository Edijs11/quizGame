'use client';
import { useEffect, useState } from 'react';
import Modal from '../components/modal';
import CreateQuizModal from './createQuizModal';
import Link from 'next/link';
import { CiSearch } from 'react-icons/ci';
import EditQuizModal from './editQuizModal';
import Card from '../components/card';

export interface Quiz {
  quizId: number;
  title: string;
  description: string;
  createdAt: Date;
  userId?: number;
}

export interface CreateQuiz {
  title: string;
  description: string;
  userId?: number;
}

const Quizzes = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [newQuiz, setNewQuiz] = useState<Quiz>({
    quizId: 1,
    title: '',
    description: '',
    createdAt: new Date(),
    userId: 1,
  });
  const [isCreateQuizModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditQuizModalOpen, setIsEditQuizModalOpen] = useState(false);
  const [isDeleteQuizModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteQuizId, setDeleteQuizId] = useState<number>(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/quizzes`);
        if (!response.ok) {
          throw new Error(`resp status: ${response.status}`);
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error('error fetching data:', error);
      }
    };
    fetchQuizzes();
  }, [newQuiz]);

  const createQuiz = async (quiz: CreateQuiz) => {
    try {
      const response = await fetch(`${apiUrl}/api/quizzes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();
      setQuizzes([data, ...quizzes]);
      //setQuizzes(prevQuizzes => [data, ...prevQuizzes]);
      setNewQuiz({
        quizId: 1,
        title: '',
        description: '',
        createdAt: new Date(),
        userId: 1,
      });
    } catch (error) {
      console.error('Error creating income:', error);
    }
  };

  const updateQuizInEditModal = async (id: number) => {
    try {
      const quiz = await fetch(`${apiUrl}/api/quizzes/${id}`);
      const data = await quiz.json();
      setNewQuiz(data);
      setIsEditQuizModalOpen(true);
      return data;
    } catch (error) {
      console.error(`Error editing quiz:`, error);
    }
  };

  // const editQuiz = async (id: number) => {
  //   try {
  //     await fetch(`${apiUrl}/api/quizzes/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(setNewQuiz),
  //     });
  //     setNewQuiz({
  //       quizId: 1,
  //       title: '',
  //       description: '',
  //       createdAt: new Date(),
  //       userId: 1,
  //     });
  //     setIsEditQuizModalOpen(false);
  //   } catch (error) {
  //     console.error(`Error editing quiz:`, error);
  //   }
  // };

  const deleteQuiz = async (id: number) => {
    try {
      await fetch(`${apiUrl}/api/quizzes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setNewQuiz),
      });
      setQuizzes(quizzes.filter((quiz) => quiz.quizId != id));
    } catch (error) {
      console.error(`Error deleting Quiz:`, error);
    }
    setIsDeleteModalOpen(false);
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col align-middle items-center bg-slate-900">
      {/* {isCreateQuizModalOpen && (
        <Modal onClose={() => setIsCreateModalOpen(false)}>
          <CreateQuizModal onCreateQuiz={createQuiz} />
        </Modal>
      )}
      {isEditQuizModalOpen && (
        <Modal onClose={() => setIsEditQuizModalOpen(false)}>
          <EditQuizModal updateQuiz={newQuiz} onEditQuiz={editQuiz} />
        </Modal>
      )} */}
      <form className="max-w-md mx-auto top-8 left-80 w-[350px] relative z-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded relative"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none z-20">
          <CiSearch />
        </span>
      </form>
      <div className="relative w-full max-w-7xl mt-10">
        {quizzes.length ? (
          <div className="relative bg-gray-700 p-2 rounded-xl mt-4">
            <button
              className="absolute top-6 right-16 p-2 bg-green-500 hover:bg-green-600 rounded text-white w-[120px]"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create
            </button>
            <div className="mx-20">
              <div className="grid grid-cols-4 gap-6 mt-20">
                {filteredQuizzes.map((quiz) => (
                  <div key={quiz.quizId}>
                    <Card
                      quiz={quiz}
                      onUpdateQuizInEditModal={updateQuizInEditModal}
                      onDeleteQuiz={deleteQuiz}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative bg-gray-700 my-16 mx-10 rounded-xl h-[500px] w-full max-w-6xl">
            <div className="">No quizzes</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Quizzes;
// <div
//   className="flex justify-center w-52 h-52 mt-16 bg-teal-400 hover:bg-teal-500 hover:shadow-2xl rounded-md"
//   key={quiz.quizId}
// >
{
  /*  <div className="relative text-center p-2 w-full"> */
}
{
  /* <h1 className="text-lg font-bold border border-b-1 border-r-0 border-l-0 border-t-0 border-black">
                      {quiz.title.charAt(0).toUpperCase() + quiz.title.slice(1)}
                    </h1> */
}

{
  /* <p className="truncate-text mt-2">
                      {truncateText(quiz.description, 70)}
                    </p>
                    <div className="absolute bottom-2 grid grid-cols-2 gap-2 w-full">
                      <p className="text-sm mt-1 -ml-4">
                        {formatDateString(String(quiz.createdAt))}
                      </p>
                      <Link href={`/quizzes/${quiz.quizId}`}>
                        <button className="h-8 w-24 bg-blue-500 hover:bg-blue-600 rounded-md -ml-8">
                          Visit
                        </button>
                      </Link>
                    </div>
                    <button
                      onClick={() => updateQuizInEditModal(quiz.quizId)}
                      className="bg-orange-300 hover:bg-orange-400 rounded text-white p-2 w-[75px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteQuiz(quiz.quizId)}
                      className="bg-red-500 hover:bg-red-600 rounded text-white p-2"
                    >
                      Delete
                    </button> */
}
{
  /* //   </div> */
}
// </div>
