import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { User } from './user';
import { LoginButton, LogoutButton } from './auth';
import Image from 'next/image';
import quizStartImg from '../public/quizStart.webp';
import questionImg from '../public/questionQuiz.png';
import quizImg from '../public/quizImg.png';

export default function Home() {
  const session = getServerSession(authOptions);
  return (
    <main className="">
      <div className="flex flex-col items-center justify-between bg-gradient-to-b from-purple-800 via-purple-500 to-purple-800 h-screen shadow-lg">
        <h1 className="absolute xl:mt-52 sm:mt-24 text-gray-100 xl:text-6xl sm:text-2xl shadow-lg">
          CHECK OUT MY QUIZZ GAME!
        </h1>
        <h2 className="absolute xl:mt-72 sm:mt-44 text-gray-100 xl:text-2xl sm:text-xl shadow-lg">
          We Have all types of quizzes! You can also create one...
        </h2>
        <Image
          src={quizStartImg}
          alt="User Profile"
          className="rounded-full mt-1"
          width={3000}
          height={1000}
        />
      </div>
      <div className="bg-amber-300 shadow-lg">
        <div className="place-items-center grid grid-cols-2 grid-rows-2 gap-4 m-8 mt-0 p-2">
          <div className="flex justify-end text-red-800 text-4xl">
            Create, complete, like and share quizzes to friends! Get started now
            and invite friends to guess together. Our platform has a great
            category catalog with all kinds of quizzes...
          </div>
          <Image
            src={quizImg}
            alt="User Profile"
            className="rounded-full mt-1"
            width={700}
            height={400}
          />

          <Image
            src={questionImg}
            alt="User Profile"
            className="rounded-full mt-1"
            width={700}
            height={400}
          />
          <h3 className="text-red-800 text-4xl text-right mr-16">
            Create your perfect quizz and share it with your friends! Later we
            will be able to edit images, backgrounds and have a great user
            profile with statistics
          </h3>
        </div>
      </div>
      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User />
    </main>
  );
}
