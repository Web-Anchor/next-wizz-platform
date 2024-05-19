'use client';

import Badge from '@app/components/Badge';
import Button from '@app/components/Button';
import Select from '@app/components/Select';
import Wrapper from '@app/components/Wrapper';
import { useSupportTickets } from '@hooks/index';
import { cFetch } from '@lib/cFetcher';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const [state, setState] = useState<{ fetching?: boolean }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const { count, isLoading } = useSupportTickets({});
  console.log(count, isLoading);

  async function submit(form: any) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: true }));
      const featureName = form.get('featureName');
      const description = form.get('description');

      const { data, status } = await cFetch({
        url: '/api/v1/support/feature-request',
        method: 'POST',
        data: { featureName, description },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
      }

      toast.success(
        'Thanks for submitting your feature request. We will review it and get back to you soon.'
      );
      formRef.current?.reset(); // Reset form ref after successful submission
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: false }));
    }
  }

  function formHandler(e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) {
    e.preventDefault();
    submit(new FormData(e.currentTarget));
  }

  return (
    <Wrapper>
      <section>
        <Badge
          title={`${count} Support Tickets`}
          class={count !== 0 ? 'bg-yellow-100 text-yellow-700' : undefined}
        />
      </section>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
        Inspire Change, Drive Innovation - Your Ideas Matter!
      </h1>
      <form
        ref={formRef}
        className="card max-w-4xl px-10 py-8 bg-base-100 shadow-xl"
        onSubmit={formHandler}
      >
        <div className="space-y-12">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex flex-1 flex-col gap-2 max-w-full lg:max-w-xs">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Request New Features
              </h2>
              <h4 className="text-xs text-gray-600">
                Shape the Future of Our Platform
              </h4>
              <p className="mt-1 text-sm leading-6 text-gray-600 text-justify">
                Submit your ideas and suggestions for new features to our
                Request New Features page. Your feedback is invaluable in
                helping us enhance our platform and tailor it to meet your
                evolving needs. We value your input and look forward to
                incorporating innovative features that elevate your experience.
              </p>
            </div>

            <div className="flex flex-col gap-5 flex-1">
              <Select
                label="Reason for contacting"
                name="featureName"
                data={[
                  { key: 1, value: 'Enhancements' },
                  { key: 2, value: 'New Functionality' },
                  { key: 3, value: 'Customization Options' },
                  { key: 4, value: 'Integration Opportunities' },
                  { key: 5, value: 'User Interface Improvements' },
                  { key: 6, value: 'Automation Requests' },
                  { key: 7, value: 'Reporting and Analytics' },
                  { key: 8, value: 'Security Enhancements' },
                  { key: 9, value: 'Mobile App Features' },
                  { key: 10, value: 'Accessibility Upgrades' },
                  { key: 11, value: 'Performance Optimization' },
                  { key: 12, value: 'Other' },
                ]}
                required
              />

              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description <span className="text-xs text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    rows={5}
                    name="description"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Description of the feature you would like to see added to the platform."
                    defaultValue={''}
                    maxLength={10000}
                    required
                  />
                </div>
                <p className="mt-3 text-xs leading-6 text-gray-600">
                  Please provide as much detail as possible so we can assist you
                  better.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button fetching={state?.fetching} type="submit">
            Submit Request
          </Button>
        </div>
      </form>
    </Wrapper>
  );
}
