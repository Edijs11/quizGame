import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const answerOptions = await prisma.answerOptions.findMany();
    return NextResponse.json(answerOptions);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'error getting answerOptions' }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const answerOptData = body.parse(body);
    const quizz = await prisma.answerOptions.create({
      data: {
        answerText: answerOptData.answerText,
        isCorrect: answerOptData.isCorrect,
        questionId: answerOptData.questionId,
      },
    });

    return new NextResponse(JSON.stringify(quizz), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'error posting quizz' }), {
      status: 500,
    });
  }
}
