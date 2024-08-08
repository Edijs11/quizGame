import { userShema } from '@/app/models/shema';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'error getting users' }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userData = userShema.parse(body);
    const user = await prisma.users.create({
      data: {
        username: userData.username,
        password: userData.password,
        email: userData.email,
      },
    });

    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'error posting user' }), {
      status: 500,
    });
  }
}
