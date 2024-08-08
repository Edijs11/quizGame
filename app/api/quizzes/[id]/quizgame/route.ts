import prisma from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const quizGame = await prisma.quizzes.findUnique({
      where: {
        quizId: id,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });
    return NextResponse.json(quizGame);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'error getting quizGame' }),
      {
        status: 500,
      }
    );
  }
}
