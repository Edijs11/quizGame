// import { revalidatePath } from 'next/cache';
// import prisma from '../app/lib/db';
// import { signIn, signOut } from 'next-auth/react';
// import AuthError from 'next-auth';

// const getUserByEmail = async (email: string) => {
//   try {
//     const user = await prisma.users.findUnique({
//       where: {
//         email,
//       },
//     });
//     return user;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// // export const login = async (provider: string) => {
// //   await signIn(provider, { redirectTo: '/' });
// //   revalidatePath('/');
// // };

// // export const logout = async () => {
// //   await signOut({ redirectTo: '/' });
// //   revalidatePath('/');
// // };

// export const loginWithCreds = async (formData: FormData) => {
//   const rawFormData = {
//     email: formData.get('email'),
//     password: formData.get('password'),
//     role: 'ADMIN',
//     redirectTo: '/',
//   };

//   const existingUser = await getUserByEmail(formData.get('email') as string);
//   console.log(existingUser);

//   try {
//     await signIn('credentials', rawFormData);
//   } catch (error: any) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return { error: 'Invalid credentials!' };
//         default:
//           return { error: 'Something went wrong!' };
//       }
//     }

//     throw error;
//   }
//   revalidatePath('/');
// };
