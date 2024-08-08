import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { User } from './user';
import { LoginButton, LogoutButton } from './auth';

export default function Home() {
  const session = getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User />
    </main>
  );
}
