'use client';

import { useTestimonials } from '@hooks/useTestimonials';
import { Spinner } from './Skeleton';

export default function TestimonialsWhiteGrid() {
  const { testimonials, isLoading } = useTestimonials({});

  if (!testimonials?.length && !isLoading) {
    return null;
  }

  return (
    <div className="relative py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We have worked with thousands of amazing people
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          {isLoading && <Spinner wrapper />}
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials?.map((testimonial, key) => {
              const rating = Number(testimonial.rating);
              const ckdClass = 'mask mask-star-2 bg-orange-400';
              const unCkdClass = 'mask mask-star-2 bg-gray-400';

              return (
                <div
                  key={key}
                  className="pt-8 sm:inline-block sm:w-full sm:px-4"
                >
                  <figure
                    key={key}
                    className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5 text-sm leading-6"
                  >
                    <blockquote className="text-gray-900">
                      <p>{`“${testimonial?.comments}”`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <img
                        className="h-10 w-10 rounded-full bg-gray-50"
                        src={testimonial?.imageUrl}
                        alt="user-profile"
                      />
                      <div>
                        <div className="font-semibold">
                          {`${testimonial?.firstName} ${testimonial?.lastName}`}
                        </div>
                        <div className="rating">
                          <input
                            type="radio"
                            className={rating >= 1 ? ckdClass : unCkdClass}
                            disabled
                          />
                          <input
                            type="radio"
                            className={rating >= 2 ? ckdClass : unCkdClass}
                            disabled
                          />
                          <input
                            type="radio"
                            className={rating >= 3 ? ckdClass : unCkdClass}
                            disabled
                          />
                          <input
                            type="radio"
                            className={rating >= 4 ? ckdClass : unCkdClass}
                            disabled
                          />
                          <input
                            type="radio"
                            className={rating >= 5 ? ckdClass : unCkdClass}
                            disabled
                          />
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
