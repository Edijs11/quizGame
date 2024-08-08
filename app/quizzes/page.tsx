'use client';
import { useEffect, useState } from 'react';
import Modal from '../components/modal';
import CreateQuizModal from './createQuizModal';
import Link from 'next/link';
import { CiSearch } from 'react-icons/ci';

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
  createdAt: Date;
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
  const [searchValue, setSearchValue] = useState('');
  const [isCreateQuizModalOpen, setIsCreateModalOpen] = useState(false);
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
      console.log('hello');
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
      console.log('Error creating quizz: ', error);
      console.error('Error creating income:', error);
    }
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(search.toLowerCase())
  );
  // const isTextTooLong = (title: string, maxLength: number): boolean => {
  //   return title.length > maxLength;
  // };

  function formatDateString(dateString: string): string {
    const dateObject = new Date(dateString);

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const formattedDate = dateObject.toLocaleDateString('en-US', dateOptions);
    return formattedDate;
  }

  function truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  return (
    <div className="flex min-h-screen flex-col align-middle items-center bg-slate-900">
      {isCreateQuizModalOpen && (
        <Modal onClose={() => setIsCreateModalOpen(false)}>
          <CreateQuizModal onCreateQuiz={createQuiz} />
        </Modal>
      )}
      <form className="max-w-md mx-auto top-20 left-80 w-[350px] relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded relative z-10"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none z-20">
          <CiSearch />
        </span>
      </form>
      <div className="relative w-full max-w-6xl mt-10">
        {quizzes.length ? (
          <div className="relative bg-gray-700 my-16 mx-10 rounded-xl h-full w-full max-w-6xl">
            <button
              className="absolute top-6 right-20 p-2 bg-green-500 hover:bg-green-600 rounded text-white w-[120px]"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create
            </button>
            <div className="grid grid-cols-5 gap-8 p-8 border-spacing-5">
              {filteredQuizzes.map((quiz) => (
                <div
                  className="flex justify-center w-52 h-52 mt-16 bg-teal-400 hover:bg-teal-500 hover:shadow-2xl rounded-md"
                  key={quiz.quizId}
                >
                  <div className="relative text-center p-2 w-full">
                    <h1 className="text-lg font-bold border border-b-1 border-r-0 border-l-0 border-t-0 border-black">
                      {quiz.title.charAt(0).toUpperCase() + quiz.title.slice(1)}
                    </h1>
                    <p className="truncate-text mt-2">
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
                  </div>
                </div>
              ))}
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
