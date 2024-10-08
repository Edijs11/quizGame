'use client';

import Modal from '@/app/components/modal';
import { QuestionType } from '@prisma/client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import CreateQuestionModal from './createQuestionModal';
import EditQuestionModal from './editQuestionModal';

export interface Question {
  questionId: number;
  questionName: string;
  questionType: QuestionType;
  quizId: number;
}

export interface CreateQuestion {
  questionName: string;
  questionType: QuestionType;
  // quizId?: number;
}

const questions = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<Question>({
    questionId: 1,
    questionName: '',
    questionType: 'YES_NO',
    quizId: 1,
  });
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false);
  const [isDeleteQuestionModalOpen, setIsDeleteQuestionModalOpen] =
    useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState<number>(0);
  const params = useParams();
  const id = params.id ? Number(params.id) : NaN;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/quizzes/${id}/questions`);
        if (!response.ok) {
          throw new Error(`resp status: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('error fetching data:', error);
      }
    };
    fetchQuestions();
  }, []);

  const createQuestion = async (quiz: CreateQuestion) => {
    try {
      const response = await fetch(`${apiUrl}/api/quizzes/${id}/questions`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(quiz),
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();
      setQuestions([data, ...questions]);
      setNewQuestion({
        questionId: 1,
        questionName: '',
        questionType: 'YES_NO',
        quizId: 1,
      });
    } catch (error) {
      console.log('Error creating question: ', error);
    }
  };

  const updateQuestionInEditModal = async () => {
    try {
      console.log('update');
      const question = await fetch(`${apiUrl}/api/quizzes/${id}`);
      const data = await question.json();
      setNewQuestion(data);
      setIsEditQuestionModalOpen(true);
      console.log(data);
      return data;
    } catch (error) {
      console.error(`Error editing question:`, error);
    }
  };
  const editQuestion = async () => {
    try {
      console.log('edit');
      await fetch(`${apiUrl}/api/quizzes/${id}/questions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setNewQuestion),
      });
      setNewQuestion({
        questionId: 1,
        questionName: '',
        questionType: 'YES_NO',
        quizId: 1,
      });
      setIsEditQuestionModalOpen(false);
    } catch (error) {
      console.error(`Error editing question:`, error);
    }
  };

  const deleteQuestion = async (id: number) => {
    try {
      await fetch(`${apiUrl}/api/quizzes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setNewQuestion),
      });
      setQuestions(questions.filter((question) => question.questionId != id));
    } catch (error) {
      console.error(`Error deleting Question:`, error);
    }
    setIsDeleteQuestionModalOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col align-middle items-center bg-slate-900">
      {isAddQuestionModalOpen && (
        <Modal onClose={() => setIsAddQuestionModalOpen(false)}>
          <CreateQuestionModal onCreateQuestion={createQuestion} />
        </Modal>
      )}
      {isEditQuestionModalOpen && (
        <Modal onClose={() => setIsEditQuestionModalOpen(false)}>
          <EditQuestionModal onEditQuestion={editQuestion} />
        </Modal>
      )}
      <Link href="/quizzes">
        <FaLongArrowAltLeft className="p-2 mt-4 text-white size-12 border border-spacing-1 border-white" />
      </Link>
      <p className="mt-6 text-white text-4xl">Questions</p>
      {questions.length ? (
        <div className="relative bg-gray-700 my-16 rounded-xl h-full w-full max-w-6xl">
          <button
            className="absolute top-6 right-6 p-2 bg-green-500 hover:bg-green-600 rounded text-white w-[120px]"
            onClick={() => setIsAddQuestionModalOpen(true)}
          >
            Create
          </button>
          <Link href={`/quizzes/1/quizgame`}>
            <button className="relative p-2 mt-6 ml-6 bg-green-500 hover:bg-green-600 rounded text-white w-[120px]">
              Start
            </button>
          </Link>
          <div className="mt-4">
            {questions.map((question) => (
              <div
                className="gap-8 p-6 border border-spacing-2 mt-2 mx-4 rounded-lg hover:bg-gray-800"
                key={question.questionId}
              >
                <div className="flex items-center justify-between flex-row text-white">
                  <p className="text-center w-full">{question.questionName}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={
                        () => updateQuestionInEditModal() //question.questionId
                      }
                      className="bg-orange-300 hover:bg-orange-400 rounded text-white p-2 w-[75px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteQuestion(question.questionId)}
                      className="bg-red-500 hover:bg-red-600 rounded text-white p-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <br />
        </div>
      ) : (
        <div>No questions</div>
      )}
    </div>
  );
};
export default questions;
