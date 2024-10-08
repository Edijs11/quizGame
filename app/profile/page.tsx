'use client';
import { UserRole } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import userImg from '../../public/user.png';
import Image, { StaticImageData } from 'next/image';

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  image?: StaticImageData;
  hashedPassword?: string;
  createdAt: Date;
  role: UserRole;
}

const Profile = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>({
    id: 1,
    username: '',
    password: '',
    email: '',
    image: userImg,
    createdAt: new Date(),
    role: 'USER',
  });
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users/${session?.user.id}`);
        if (!response.ok) {
          throw new Error(`resp status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('error fetching data:', error);
      }
    };
    fetchQuizzes();
  }, []);
  // const getUser = async () => {
  //   try {
  //     const response = await fetch(`${apiUrl}/api/users/${session?.user.id}`);
  //     if (!response.ok) {
  //       throw new Error(`resp status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setUser(data);
  //   } catch (error) {
  //     console.error('error fetching data:', error);
  //   }
  // };
  console.log(user);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center">
          {user.image ? (
            <Image
              src={user.image}
              alt="User Profile"
              className="rounded-full"
              width={100}
              height={100}
            />
          ) : (
            <div className="bg-gray-300 rounded-full h-24 w-24 flex items-center justify-center text-2xl font-bold text-white">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="text-center mt-6">
          <h2 className="text-xl font-bold text-gray-900">{user.username}</h2>
          <p className="text-gray-500">Email: {user.email}</p>
        </div>
        <div className="text-center mt-4">
          <span
            className={`inline-block px-4 py-1 rounded-full text-white ${
              user.role === 'ADMIN'
                ? 'bg-red-500'
                : user.role === 'USER'
                ? 'bg-blue-500'
                : 'bg-green-500'
            }`}
          >
            {user.role}
          </span>
        </div>
        <div className="text-center mt-4 text-gray-600">
          <p>Joined at: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="space-x-4 text-center mt-6">
          <button className="bg-orange-300 hover:bg-orange-400 rounded text-white p-2 w-[110px]">
            Edit profile
          </button>
          <button className="bg-red-500 hover:bg-red-600 rounded text-white p-2">
            Delete profile
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
