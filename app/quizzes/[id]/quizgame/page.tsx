'use client';
import { LoginButton } from '@/app/auth';
import { QuestionType } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface QuizGame {
  quizId: number;
  userId: number;
  title: string;
  description: string;
  createdAt: Date;
  questions: Question[];
  answers: Answer[];
}
interface Question {
  questionId: number;
  questionName: string;
  questionType: QuestionType;
  quizId?: number;
}

export interface Answer {
  answerId: number;
  answerText: string;
  isCorrect: boolean;
  questionId: number;
}

const QuizGame = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [quizGame, setQuizGame] = useState<QuizGame[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  // const [isAnswered, setIsAnswered] = useState(false);
  const [clickedAnswerId, setClickedAnswerId] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState<Answer>({
    answerId: 1,
    answerText: '',
    isCorrect: false,
    questionId: 1,
  });
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const id = params.id ? Number(params.id) : NaN;
  const { data: session, status } = useSession();
  console.log(session, status);
  useEffect(() => {
    const fetchQuizGame = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/quizzes/${id}/quizgame`);
        if (!response.ok) {
          throw new Error(`resp status: ${response.status}`);
        }
        const data = await response.json();

        setQuizGame(data);
      } catch (error) {
        console.error('error fetching data:', error);
      }
    };
    fetchQuizGame();
  }, []);
  console.log(quizGame.questions?.[currentQuestionIndex].answers);

  // const checkQuestionType = () => {
  //   if (
  //     quizGame?.[0]?.questions?.[currentQuestionIndex]?.questionType ===
  //     'YES_NO'
  //   ) {
  //     return true;
  //   } else return false;
  // };

  const handleAnswerClick = (answer: Answer) => {
    if (answer.isCorrect) {
      // setCorrectAnswer(answer);
      // setShowCorrectAnswer(true); //
      setCorrectAnswerCount(correctAnswerCount + 1);
    }

    // const correctAnswer = quizGame?.[0]?.answers.find(
    //   (answer) => answer.isCorrect
    // );
    // setCorrectAnswer(correctAnswer)
    // setCorrectAnswerIndex(correctAnswer?.answerId || 1);
    setClickedAnswerId(answer.answerId);
    console.log(clickedAnswerId);
    setShowCorrectAnswer(false);
    console.log(showCorrectAnswer);

    setTimeout(() => {
      if (currentQuestionIndex < quizGame.questions?.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCorrectAnswerCount(correctAnswerCount + 1);
        setCorrectAnswer({
          answerId: 1,
          answerText: '',
          isCorrect: false,
          questionId: 1,
        });
        setShowCorrectAnswer(true);
      } else {
        router.push(`/quizzes/${quizGame?.[0]?.quizId}/quizcompleted`);
      }
    }, 1500);
  };

  const questionName = () => {
    if (!quizGame) {
      return '';
    } else return quizGame.questions?.[currentQuestionIndex]?.questionName;
  };
  if (status === 'loading')
    return (
      <div className="flex flex-col items-center p-6">
        <div className="inline-block w-8 h-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125]" />
      </div>
    );
  return status === 'authenticated' ? (
    <div className="flex min-h-screen flex-col align-middle items-center mt-10">
      <h1 className="text-5xl mt-8">{quizGame.title}</h1>
      <h2 className="text-3xl mt-6">Question NR {currentQuestionIndex + 1}</h2>
      <h3 className="text-2xl mt-8">{questionName()}</h3>
      {/* <h3 className="text-2xl mt-8">{correctAnswerIndex}</h3> */}
      <div className="grid grid-cols-2 gap-8">
        {quizGame.questions?.[currentQuestionIndex].answers.map(
          (answer: Answer) => (
            <div key={answer.answerId}>
              <button
                key={answer.answerId}
                onClick={() => handleAnswerClick(answer)}
                className={`flex justify-center w-96 h-28 mt-4 bg-slate-500 hover:bg-slate-600 hover:shadow-2xl rounded-md 
              ${
                !showCorrectAnswer
                  ? 'bg-slate-500 hover:bg-slate-600 hover:shadow-2xl'
                  : answer.isCorrect
                  ? 'bg-green-500'
                  : clickedAnswerId === answer.answerId
                  ? 'bg-red-500'
                  : 'bg-slate-500'
              }`}
              >
                <div className="mt-10">{answer.answerText}</div>
              </button>
            </div>
          )
        )}
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center ">
        <h1>Login to access the page</h1>
        <LoginButton />
      </div>
    </div>
  );
};
export default QuizGame;
