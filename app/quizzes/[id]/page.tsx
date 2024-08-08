'use client';

import Modal from '@/app/components/modal';
import { QuestionType } from '@prisma/client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import CreateQuestionModal from './createQuestionModal';

export interface Question {
  questionId: number;
  questionName: string;
  questionType: QuestionType;
  createdAt: Date;
  quizId: number;
}

export interface CreateQuestion {
  questionName: string;
  questionType: QuestionType;
  createdAt: Date;
  quizId: number;
}
//{ params }: { params: { id: string } }

const questions = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestions, setNewQuestions] = useState<Question>({
    questionId: 1,
    questionName: '',
    questionType: 'YES_NO',
    createdAt: new Date(),
    quizId: 1,
  });
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
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
      const response = await fetch(`${apiUrl}/api/quizzes/${id}`, {
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
      setNewQuestions({
        questionId: 1,
        questionName: '',
        questionType: 'YES_NO',
        createdAt: new Date(),
        quizId: 1,
      });
    } catch (error) {
      console.log('Error creating question: ', error);
    }
  };
  return (
    <div className="flex min-h-screen flex-col align-middle items-center bg-slate-900">
      {isAddQuestionModalOpen && (
        <Modal onClose={() => setIsAddQuestionModalOpen(false)}>
          <CreateQuestionModal onCreateQuestion={createQuestion} />
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
                <div
                  className="flex justify-center flex-row text-white"
                  key={question.questionId}
                >
                  <div className="relative text-center p-2">
                    <p>{question.questionName}</p>
                    <p>{question.questionType}</p>
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
