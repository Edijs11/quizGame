import { quizShema } from '@/app/models/shema';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const quizzes = await prisma.quizzes.findMany();
    return NextResponse.json(quizzes);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'error getting quizzes' }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('aaaa');
    const session = await getServerSession({ req, ...authOptions });
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }
    const userId = parseInt(session.user.id, 10);
    if (isNaN(userId)) {
      return new NextResponse(JSON.stringify({ error: 'Invalid user ID' }), {
        status: 400,
      });
    }
    const body = await req.json();
    console.log(body);
    const quizData = quizShema.parse(body);
    console.log(quizData);
    const quiz = await prisma.quizzes.create({
      data: {
        title: quizData.title,
        description: quizData.description,
        createdAt: quizData.createdAt,
        // userId: Number(quizData.userId),
        userId: userId,
      },
    });
    console.log(quiz);

    return new NextResponse(JSON.stringify(quiz), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: 'error posting quizz' }), {
      status: 500,
    });
  }
}

// app.get('/quizzes', async () => {
//   try {
//     const quizzes = await prisma.quizzes.findMany();
//     return NextResponse.json(quizzes);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch quizzes' },
//       { status: 500 }
//     );
//   }
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'GET') {
//     const users = await prisma.users.findMany();
//     res.status(200).json(users);
//   } else if (req.method === 'POST') {
//     const { username, password, email } = req.body;
//     const user = await prisma.users.create({
//       data: {
//         username,
//         password,
//         email,
//       },
//     });
//     res.status(201).json(user);
//   } else {
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
