'use client';
import { QuestionType } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Answer } from '../quizzes/[id]/quizgame/page';
import Modal from '../components/modal';
import EditQuizModal from '../quizzes/editQuizModal';
import CreateQuizModal from '../quizzes/createQuizModal';

interface Quiz {
  quizId: number;
  title: string;
  description: string;
  createdAt: Date;
  userId?: number;
  questions: Question[];
}

interface Question {
  questionId: number;
  questionName: string;
  questionType: QuestionType;
  quizId: number;
  answers: Answer[];
}

export interface CreateQuiz {
  title: string;
  description: string;
  userId?: number;
}
const MyQuizzes = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [newQuiz, setNewQuiz] = useState<Quiz>({
    quizId: 1,
    title: '',
    description: '',
    createdAt: new Date(),
    userId: 1,
    questions: [],
  });
  const [openQuiz, setOpenQuiz] = useState<number>(0);
  const [openQuestion, setOpenQuestion] = useState<number>(0);
  const [isCreateQuizModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditQuizModalOpen, setIsEditQuizModalOpen] = useState(false);
  const [isDeleteQuizModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteQuizId, setDeleteQuizId] = useState<number>(0);

  // const handleKeyDown = (e, id, type) => {
  //   if(e.key === "Enter" || e.key === " ") {
  //     if (type === "quiz") {
  //       setOpenQuiz(openQuiz === id)
  //     }
  //   }
  // }

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/myquizzes`);
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
      setNewQuiz({
        quizId: 1,
        title: '',
        description: '',
        createdAt: new Date(),
        userId: 1,
        questions: [],
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

  const editQuiz = async (id: number) => {
    try {
      await fetch(`${apiUrl}/api/quizzes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setNewQuiz),
      });
      setNewQuiz({
        quizId: 1,
        title: '',
        description: '',
        createdAt: new Date(),
        userId: 1,
        questions: [],
      });
      setIsEditQuizModalOpen(false);
    } catch (error) {
      console.error(`Error editing quiz:`, error);
    }
  };

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

  return (
    <div className="w-full max-w-xl mx-auto mt-10">
      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100"> */}
      {isCreateQuizModalOpen && (
        <Modal onClose={() => setIsCreateModalOpen(false)}>
          <CreateQuizModal onCreateQuiz={createQuiz} />
        </Modal>
      )}
      {isEditQuizModalOpen && (
        <Modal onClose={() => setIsEditQuizModalOpen(false)}>
          <EditQuizModal updateQuiz={newQuiz} onEditQuiz={editQuiz} />
        </Modal>
      )}
      <h1 className="text-4xl">My Quizzes</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mt-2">
        <div className="flex justify-end items-end">
          <button
            className="bg-green-500 hover:bg-green-600 rounded text-white h-[40px] w-[160px]"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create New Quizz
          </button>
        </div>
        {quizzes.map((quiz) => (
          <div key={quiz.quizId} className="mt-4">
            <div
              tabIndex={0}
              onClick={() =>
                setOpenQuiz(openQuiz === quiz.quizId ? 0 : quiz.quizId)
              }
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md flex justify-between items-center"
            >
              <span>{quiz.title}</span>
              <span>
                {openQuiz === quiz.quizId ? '▲' : '▼'}

                <button
                  className="mx-1"
                  onClick={() => setIsEditQuizModalOpen(true)}
                >
                  E
                </button>
                <button
                  className="mx-1"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  D
                </button>
              </span>
            </div>
            {openQuiz === quiz.quizId && (
              <div className="mt-2">
                {quiz.questions?.map((question) => (
                  <div key={question.questionId} className="mb-2">
                    <div
                      tabIndex={0}
                      onClick={() =>
                        setOpenQuestion(
                          openQuestion === question.questionId
                            ? 0
                            : question.questionId
                        )
                      }
                      className="cursor-pointer bg-gray-200 text-black px-3 py-1 rounded-md flex justify-between items-center"
                    >
                      <span>{question.questionName}</span>
                      <span>
                        {openQuestion === question.questionId ? '▲' : '▼'}
                      </span>
                    </div>

                    {openQuestion === question.questionId && (
                      <div className="mt-1 pl-4">
                        {question.answers.map((answer) => (
                          <div
                            key={answer.answerId}
                            className="bg-gray-100 text-black px-3 py-1 rounded-md"
                          >
                            {answer.answerText}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyQuizzes;
