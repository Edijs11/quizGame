import { quizShema } from '@/app/models/shema';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

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

    const quizzes = await prisma.quizzes.findMany({
      where: {
        userId,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Error getting quizzes' }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
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
    const quizData = quizShema.parse(body);
    const quiz = await prisma.quizzes.create({
      data: {
        title: quizData.title,
        description: quizData.description,
        userId: userId,
      },
    });

    return new NextResponse(JSON.stringify(quiz), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: 'error posting quizz' }), {
      status: 500,
    });
  }
}
