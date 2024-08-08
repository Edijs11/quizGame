import Image from 'next/image';
import Winning from '../../../../public/userWinning.webp';

const QuizCompleted = () => {
  return (
    <div className="flex min-h-screen flex-col align-middle items-center mt-12">
      <h1 className="text-7xl mt-20">You Won!</h1>
      <Image src={Winning} alt="" width={500} className="mt-6" />
    </div>
  );
};
export default QuizCompleted;
