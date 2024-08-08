'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateQuestion } from './page';
import { questionShema } from '@/app/models/shema';

type CreateQuestionProps = {
  onCreateQuestion: (question: CreateQuestion) => Promise<void>;
};

type TCreateQuestionShema = z.infer<typeof questionShema>;

const CreateQuestionModal = ({ onCreateQuestion }: CreateQuestionProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateQuestionShema>({
    resolver: zodResolver(questionShema),
  });

  const onSubmit: SubmitHandler<TCreateQuestionShema> = async (data) => {
    console.log('Form submitted with data:', data);
    try {
      console.log('aa');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await onCreateQuestion(data);
      console.log('question created', data);
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
      <p className="mt-2">Question Name:</p>
      <input
        {...register('questionName')}
        type="text"
        placeholder="Question Name"
        className="text-black rounded-sm"
      />
      {errors.questionName && (
        <p className="text-red-500">{`${errors.questionName.message}`}</p>
      )}
      <p className="mt-2">Question Name:</p>
      <input
        {...register('questionType')}
        type="text"
        placeholder="Type"
        className="text-black rounded-sm"
      />
      {errors.questionType && (
        <p className="text-red-500">{`${errors.questionType.message}`}</p>
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
export default CreateQuestionModal;
