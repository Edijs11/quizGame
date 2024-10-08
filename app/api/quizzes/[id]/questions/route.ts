import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { questionShema, quizShema } from '@/app/models/shema';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
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

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const questionData = questionShema.parse(body);

    const newQuestion = await prisma.questions.create({
      data: {
        questionName: questionData.questionName,
        questionType: questionData.questionType,
        quizId: id,
      },
    });

    return new NextResponse(JSON.stringify(newQuestion), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'error posting quizz' }), {
      status: 500,
    });
  }
}

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await req.json();
//     const questionData = questionShema.parse(body);
//     console.log(questionData);
//     const question = await prisma.questions.update({
//       where: {
//         questionId: Number(params.id),
//       },
//       data: {
//         questionName: question.questionName,
//         questionType: question.questionType,
//       },
//     });
//     return new NextResponse(JSON.stringify(question), { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return new NextResponse(JSON.stringify({ error: 'error posting quizz' }), {
//       status: 500,
//     });
//   }
// }

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
