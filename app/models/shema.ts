import { z } from 'zod';

export const quizShema = z.object({
  quizId: z.number().optional(),
  title: z
    .string()
    .min(3, { message: 'Minimālais rakstzīmju daudzums ir 3' })
    .max(50, { message: 'Miksimālais rakstzīmju daudzums ir 50' }),
  description: z
    .string()
    .min(7, { message: 'Minimālais rakstzīmju daudzums ir 7' })
    .max(500, { message: 'Miksimālais rakstzīmju daudzums ir 500' }),
  userId: z.number().optional(),
});

export const questionShema = z.object({
  questionId: z.number().optional(),
  questionName: z
    .string()
    .min(5, { message: 'Minimālais rakstzīmju daudzums ir 5' })
    .max(40, { message: 'Miksimālais rakstzīmju daudzums ir 40' }),
  questionType: z.enum(['YES_NO', 'MULTIPLE_CHOICE']),
  quizId: z.number().nullable().optional(),
});

export const userShema = z.object({
  quizId: z.number().optional(),
  username: z
    .string()
    .min(5, { message: 'Minimālais rakstzīmju daudzums ir 5' })
    .max(40, { message: 'Miksimālais rakstzīmju daudzums ir 40' }),
  password: z
    .string()
    .min(5, { message: 'Minimālais rakstzīmju daudzums ir 5' })
    .max(40, { message: 'Miksimālais rakstzīmju daudzums ir 40' }),
  email: z
    .string()
    .min(5, { message: 'Minimālais rakstzīmju daudzums ir 5' })
    .max(40, { message: 'Miksimālais rakstzīmju daudzums ir 40' }),
  userId: z.number().optional(),
});

export const answersShema = z.object({
  quizId: z.number().optional(),
  answerText: z
    .string()
    .min(5, { message: 'Minimālais rakstzīmju daudzums ir 5' })
    .max(40, { message: 'Miksimālais rakstzīmju daudzums ir 40' }),
  isCorect: z.boolean(),
  questionId: z.number().optional(),
});
