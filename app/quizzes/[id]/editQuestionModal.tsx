'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { QuestionType } from '@prisma/client';
import { questionShema } from '@/app/models/shema';

type TEditQuestionShema = z.infer<typeof questionShema>;
const EditQuestionModal = ({ updateQuestion, onEditQuestion }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TEditQuestionShema>({
    resolver: zodResolver(questionShema),
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        reset(updateQuestion);
      } catch {
        throw new Error('could not get the Question');
      }
    };
    fetchQuestion();
  }, [reset]);

  const onSubmit: SubmitHandler<TEditQuestionShema> = async (data) => {
    try {
      console.log('submit');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onEditQuestion(data.questionId, data);
    } catch (error) {
      throw new Error('failed to submit Question');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-2">
      <h1 className="text-xl place-self-center -mt-8">Edit Question</h1>
      <p>Question Name:</p>
      <input
        {...register('questionName')}
        type="text"
        placeholder="Nosaukums"
        className="text-black rounded-sm"
      />
      {errors.questionName && (
        <p className="text-red-500">{`${errors.questionName.message}`}</p>
      )}

      <p>Question Type:</p>
      <select {...register('questionType')} className="text-black rounded-sm">
        {Object.values(QuestionType).map((selectedType) => (
          <option key={selectedType} value={selectedType}>
            {selectedType}
          </option>
        ))}
      </select>
      {errors.questionType && (
        <p className="text-red-500">{`${errors.questionType.message}`}</p>
      )}
      <button
        type="submit"
        className="p-2 bg-blue-500 hover:bg-blue-600 rounded text-white mt-6"
      >
        Edit Question
      </button>
    </form>
  );
};
export default EditQuestionModal;
