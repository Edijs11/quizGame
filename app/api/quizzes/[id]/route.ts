import { quizShema } from '@/app/models/shema';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

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
    const body = await req.json();
    const quizzData = quizShema.parse(body);
    const quiz = await prisma.quizzes.update({
      where: {
        quizId: quizzData.userId,
      },
      data: {
        title: quizzData.title,
        description: quizzData.description,
        createdAt: quizzData.createdAt,
        userId: quizzData.userId,
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
