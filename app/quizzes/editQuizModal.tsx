'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { quizShema } from '../models/shema';

type TEditQuizShema = z.infer<typeof quizShema>;
const EditQuizModal = ({ updateQuiz, onEditQuiz }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TEditQuizShema>({
    resolver: zodResolver(quizShema),
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        reset(updateQuiz);
      } catch {
        throw new Error('could not get the Quiz');
      }
    };
    fetchQuiz();
  }, [reset]);

  const onSubmit: SubmitHandler<TEditQuizShema> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onEditQuiz(data.quizId, data);
    } catch (error) {
      throw new Error('failed to submit Quiz');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-2">
      <h1 className="text-xl place-self-center -mt-8">Edit Quiz</h1>
      <p>Title:</p>
      <input
        {...register('title')}
        type="text"
        placeholder="Nosaukums"
        className="text-black rounded-sm"
      />
      {errors.title && (
        <p className="text-red-500">{`${errors.title.message}`}</p>
      )}

      <p>Description:</p>
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
        Edit Quiz
      </button>
    </form>
  );
};
export default EditQuizModal;
