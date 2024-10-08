import prisma from '@/app/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
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

    const users = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'error getting user' }), {
      status: 500,
    });
  }
}
