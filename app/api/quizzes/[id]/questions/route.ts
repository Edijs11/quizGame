import { questionShema } from '@/app/models/shema';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const questions = await prisma.questions.findMany({
      where: {
        quizId: id,
      },
    });
    return NextResponse.json(questions);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'error getting questions' }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const questionData = questionShema.parse(body);
    const quizId =
      questionData.quizId !== null ? questionData.quizId : undefined;

    const newQuestion = await prisma.questions.create({
      data: {
        ...body,
        quizId: quizId,
      },
    });

    return new NextResponse(JSON.stringify(newQuestion), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'error posting quizz' }), {
      status: 500,
    });
  }
}
