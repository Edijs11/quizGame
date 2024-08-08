// 'use client';
import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';
import { LoginButton, LogoutButton } from '../auth';
import { useSession } from 'next-auth/react';

const NavBar = () => {
  // const { data: session } = useSession();
  // const user = session?.user;
  return (
    <header className="flex items-center justify-between bg-gray-800 p-6 text-gray-300">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">Quizz</div>
        <nav className="">
          <div className="flex flex-row max-w-7xl mx-auto px-4">
            <Link
              href="/"
              className="hover:bg-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/quizzes"
              className="hover:bg-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Quizzes
            </Link>
          </div>
        </nav>
        <FaRegUserCircle className="h-7 w-7" />
        {/* <LogoutButton /> */}
        {/* <LoginButton /> */}
      </div>
    </header>
  );
};
export default NavBar;
