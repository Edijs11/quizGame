'use client';
import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';
import { LoginButton, LogoutButton } from '../auth';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const NavBar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);

  const toggleUserDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="flex items-center justify-between bg-gray-800 p-6 text-gray-300 sticky top-0 z-50">
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

        {!user ? (
          <LoginButton />
        ) : (
          <div className="relative inline-block">
            <button
              onClick={toggleUserDropdown}
              className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              <FaRegUserCircle className="h-7 w-7" />
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path stroke="currentColor" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {isOpen && (
              <ul className="flex flex-col absolute bg-slate-500 border border-gray-600 shadow-lg z-50">
                <Link
                  href="/profile"
                  className="text-gray-300 hover:bg-gray-600 px-3 py-2 text-sm font-medium"
                  onClick={toggleUserDropdown}
                >
                  Profile
                </Link>
                <Link
                  href="/myquizzes"
                  className="text-gray-300 hover:bg-gray-600 px-3 py-2 text-sm font-medium"
                  onClick={toggleUserDropdown}
                >
                  My quizzes
                </Link>
                <LogoutButton />
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
export default NavBar;
