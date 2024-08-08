// import withAuth from 'next-auth/middleware';
// import { NextRequest } from 'next/server';
export { default } from 'next-auth/middleware';

// export default withAuth(
//   function middleware(req: NextRequest) {
//     const { role } = req.nextauth.token || {};

//     if (req.nextUrl.pathname.startsWith('/admin') && role !== 'ADMIN') {
//       return NextResponse.redirect(new URL('/unauthorized', req.url));
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// );

export const config = { matcher: ['/quizzes', '/questions'] };
