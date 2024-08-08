import prisma from '@/app/lib/db';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'name@email.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials.password) {
            return null;
          }

          const user = await prisma.users.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            console.error('No user found with that email');
            throw new Error('No user found');
          }

          if (credentials.password !== user.password) {
            console.error('Invalid password');
            throw new Error('Invalid password');
          }

          return {
            id: user.id.toString(),
            username: user.username,
            email: user.email,
            image: user.image,
            hashedPassword: user.password,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user });
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token });
      session.user.id = String(token.id);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
