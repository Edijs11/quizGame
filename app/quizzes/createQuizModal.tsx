'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { quizShema } from '../models/shema';
import { CreateQuiz } from './page';

type CreateQuizProps = {
  onCreateQuiz: (quiz: CreateQuiz) => Promise<void>;
};

type TCreateQuizShema = z.infer<typeof quizShema>;

const CreateQuizModal = ({ onCreateQuiz }: CreateQuizProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateQuizShema>({
    resolver: zodResolver(quizShema),
  });

  const onSubmit: SubmitHandler<TCreateQuizShema> = async (data) => {
    console.log('Form submitted with data:', data);
    try {
      console.log('aa');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await onCreateQuiz(data);
      console.log('quizz createdL', data);
      reset();
    } catch {
      console.log('aaerr');
      throw new Error('failed to create quiz');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-2 text-white"
    >
      <h1 className="text-xl place-self-center">Add quiz</h1>
      <p className="mt-2">Title:</p>
      <input
        {...register('title')}
        type="text"
        placeholder="Title"
        className="text-black rounded-sm"
      />
      {errors.title && (
        <p className="text-red-500">{`${errors.title.message}`}</p>
      )}
      <p className="mt-2">Description:</p>
      <textarea
        {...register('description')}
        placeholder="Description"
        className="text-black rounded-sm"
        rows={2}
        wrap="hard"
      />
      {errors.description && (
        <p className="text-red-500">{`${errors.description.message}`}</p>
      )}

      <button
        type="submit"
        className="p-2 bg-blue-500 hover:bg-blue-600 rounded text-white mt-6"
      >
        Add
      </button>
    </form>
  );
};
export default CreateQuizModal;
