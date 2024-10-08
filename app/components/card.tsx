import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface Quiz {
  quizId: number;
  title: string;
  description: string;
  createdAt: Date;
  userId?: number;
}

// interface CardProps {
//   onClose: () => void;
//   children: React.ReactNode;
// }
//{ onClose, children }: CardProps

const Card = ({ quiz, updateQuizInEditModal, deleteQuiz }: any) => {
  function truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

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
  return (
    <div className="flex flex-col justify-between w-64 h-64 bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="w-full">
        <h1 className="text-lg font-bold border-b border-gray-300 dark:border-gray-500 mb-2">
          {quiz.title.charAt(0).toUpperCase() + quiz.title.slice(1)}
        </h1>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          {truncateText(quiz.description, 70)}
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {formatDateString(String(quiz.createdAt))}
        </p>
      </div>

      <div className="mt-4 flex justify-between space-x-2 w-full">
        <button
          onClick={() => updateQuizInEditModal(quiz.quizId)}
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md w-1/3 transition-colors duration-200"
          aria-label={`Edit quiz titled ${quiz.title}`}
        >
          Edit
        </button>

        <Link href={`/quizzes/${quiz.quizId}`} className="w-1/3">
          <div className="block">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full transition-colors duration-200"
              aria-label={`Visit quiz titled ${quiz.title}`}
            >
              Visit
            </button>
          </div>
        </Link>

        <button
          onClick={() => deleteQuiz(quiz.quizId)}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-1/3 transition-colors duration-200"
          aria-label={`Delete quiz titled ${quiz.title}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default Card;
