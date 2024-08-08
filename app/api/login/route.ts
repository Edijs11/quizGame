import { signJwtAccessToken } from '../../lib/jwt';
import prisma from '../../lib/db';
import * as bcrypt from 'bcryptjs';

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const user = await prisma.users.findFirst({
    where: {
      email: body.username,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;

    // Create jwt
    const accessToken = signJwtAccessToken(userWithoutPass);

    // Combine user with jwt
    const result = {
      ...userWithoutPass,
      accessToken,
    };
    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}
