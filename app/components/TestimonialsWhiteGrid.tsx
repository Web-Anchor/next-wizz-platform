'use client';

import { useTestimonials } from '@hooks/useTestimonials';
import { Spinner } from './Skeleton';
import { StarIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { classNames } from '@helpers/index';
import { useState } from 'react';

export default function TestimonialsWhiteGrid() {
  const [state, setState] = useState<{ error?: boolean }>({});
  const { testimonials, isLoading } = useTestimonials({});

  if (!testimonials?.length && !isLoading) {
    return null;
  }

  return (
    <div className="relative py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl lg:text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            We have worked with thousands of amazing people
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          {isLoading && <Spinner wrapper />}
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials?.map((testimonial, key) => {
              const rating = Number(testimonial.rating);

              return (
                <div
                  key={key}
                  className="pt-8 sm:inline-block sm:w-full sm:px-4"
                >
                  <figure
                    key={key}
                    className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5 text-sm leading-6"
                  >
                    <blockquote className="text-gray-800">
                      <p>{`“${testimonial?.comments}”`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      {testimonial?.imageUrl && !state.error && (
                        <img
                          className="h-10 w-10 rounded-full bg-gray-50"
                          src={testimonial.imageUrl}
                          alt="user-profile"
                          onError={() => {
                            setState((prev) => ({ ...prev, error: true }));
                          }}
                        />
                      )}

                      {(!testimonial?.imageUrl || state.error) && (
                        <UserCircleIcon className="h-12 w-12 text-gray-300" />
                      )}
                      <div>
                        <div className="font-semibold">
                          {nameValidator(
                            testimonial?.firstName,
                            testimonial?.lastName
                          )}
                        </div>
                        <div className="flex items-center gap-x-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <StarIcon
                              key={i}
                              className={classNames(
                                rating >= i + 1
                                  ? 'text-orange-400'
                                  : 'text-gray-300',
                                'h-6 w-6'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function nameValidator(firstName?: string, lastName?: string) {
  if (!firstName && !lastName) {
    return 'Customer';
  }

  return firstName ?? '' + ' ' + lastName ?? '';
}
