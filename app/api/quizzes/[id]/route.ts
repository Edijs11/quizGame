import { quizShema } from '@/app/models/shema';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const quizzes = await prisma.quizzes.findUnique({
      where: {
        quizId: Number(id),
      },
    });
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

export async function PUT(req: NextRequest) {
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
    const quizzData = quizShema.parse(body);
    console.log(quizzData);
    const quiz = await prisma.quizzes.update({
      where: {
        quizId: quizzData.quizId,
      },
      data: {
        title: quizzData.title,
        description: quizzData.description,
        userId: userId,
      },
    });
    return new NextResponse(JSON.stringify(quiz), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: 'error posting quizz' }), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const deleteQuiz = await prisma.quizzes.delete({
      where: {
        quizId: id,
      },
    });
    return NextResponse.json(deleteQuiz, { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'failed to delete quiz:' }),
      { status: 500 }
    );
  }
}
