'use client';

import { classNames } from '@helpers/index';
import Button from './Button';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { cFetch } from '@lib/cFetcher';
import PageHeadings from './PageHeadings';
import { SectionWrapper } from './Wrapper';
import { maxLength } from '@config/index';
import { StarIcon } from '@heroicons/react/24/solid';

type Props = {
  class?: string;
};

export default function RateSection(props: Props): React.ReactElement {
  const [state, setState] = useState<{
    fetching?: string;
    rating: number;
  }>({
    rating: 5,
  });
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(form: any) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100)); // 🚧 UI update timeout
      setState((prev) => ({ ...prev, fetching: 'rating' }));
      const comments = form.get('comments');

      // --------------------------------------------------------------------------------
      // 📌  Comment validation
      // --------------------------------------------------------------------------------
      if (comments.length < 10) {
        throw new Error('Please provide a detailed comment.');
      }

      const { data, status, error } = await cFetch({
        url: '/api/v1/add-rating',
        method: 'POST',
        data: {
          rating: state.rating,
          comments,
        },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error ?? error);
      }

      toast.success(
        `Thanks for rating your experience with ${state?.rating} stars. 🌟`
      );
      formRef.current?.reset(); // Reset form ref after successful submission
    } catch (error: any) {
      console.error('🔑 error', error, JSON.stringify(error));
      toast.error(error.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined, rating: 5 }));
    }
  }

  function handleRating(rating: number) {
    setState((prev) => ({ ...prev, rating }));
  }

  return (
    <SectionWrapper>
      <PageHeadings
        title="Rate Your Experience."
        description="Share your feedback by rating your experience with our services. Your input helps us enhance our offerings and ensure we meet your expectations."
        slogan="Your Rating Shapes Our Service!"
      />

      <form className={classNames(props.class)} ref={formRef} action={submit}>
        <div className="rating">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              key={i}
              className={classNames(
                state.rating >= i + 1 ? 'text-orange-400' : 'text-gray-300',
                'h-6 w-6 cursor-pointer'
              )}
              onClick={() => handleRating(i + 1)}
            />
          ))}
        </div>

        <div className="mt-2">
          <textarea
            rows={5}
            name="comments"
            className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter your message"
            defaultValue={''}
            maxLength={maxLength?.comment}
            required
          />
        </div>

        <Button
          title="Submit"
          type="submit"
          fetching={state.fetching === 'rating'}
          style="link"
          class="mt-6 ml-auto"
        />
      </form>
    </SectionWrapper>
  );
}
