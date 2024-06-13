'use client';

import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { classNames } from '@helpers/index';
import Button from './Button';
import { cFetch } from '@lib/cFetcher';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'sonner';

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
];
export const TIER_PLANS = [
  {
    name: 'Freelancer',
    id: 'prod_PxZwoEH77CM8jJ',
    price: { monthly: '$49', annually: '$144' },
    description: 'The essentials to provide your best work for clients.',
    features: [
      'Unlimited invoicing',
      'Self-print feature',
      'Basic analytics',
      '48-hour support response time',
      'Connect your Stripe account with your API key',
      'Send up to 250 invoices to customers',
    ],
    featured: false,
    cta: 'Buy plan',
  },
  {
    name: 'Startup',
    id: 'prod_PxZwoWCul00SuF',
    price: { monthly: '$69', annually: '$288' },
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      'All features in Freelancer plan',
      'Customizable templates',
      'Advanced analytics',
      '24-hour support response time',
      'Send up to 500 invoices to customers',
      'Customer Portal branding & customization',
    ],
    featured: true,
    cta: 'Buy plan',
  },
  {
    name: 'Enterprise',
    id: 'prod_PxZxKuN5s5xJyi',
    price: '$249',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'All features in Startup plan',
      'Unlimited invoices',
      'Custom domain',
      'Priority support',
      'Send up to 5000 invoices to customers',
      'Custom integrations & features',
    ],
    featured: false,
    cta: 'Buy plan',
  },
];

export default function Pricing() {
  const [state, setState] = useState<{ fetching?: string }>({});
  const [frequency, setFrequency] = useState(frequencies[0]);
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();

  async function createSubscription(id: string) {
    try {
      setState({ fetching: id });

      if (!isSignedIn) {
        const redirect = encodeURIComponent(`/#pricing`);
        router.push(`/sign-in?redirect=${redirect}`); // Redirect to sign-in if no user is logged in
        return;
      }

      const { data, status } = await cFetch({
        url: `/api/v1/stripe/subscriptions/create`,
        method: 'POST',
        data: { id },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
      }

      if (data?.url) {
        router.push(data?.url); // Redirect to Stripe Checkout
      }

      console.log('🔑 Data', data);
    } catch (error: any) {
      console.error('🔑 Error', error);
      toast.error(`Failed to create subscription!`);
    } finally {
      setState({ fetching: undefined });
    }
  }

  return (
    <div id="pricing" className="py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans for teams of all sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Choose the plan that best suits your needs and enjoy the increasing
          benefits as you scale up from Freelancer to Startup and Enterprise
          plans.
        </p>

        {/* <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">
              Payment frequency
            </RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-indigo-600 text-white' : 'text-gray-500',
                    'cursor-pointer rounded-full px-2.5 py-1'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div> */}

        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {TIER_PLANS.map((tier, key) => {
            const fetching = state?.fetching === tier.id;
            const isEnterprise = tier.name === 'Enterprise';

            return (
              <div
                key={key}
                className={classNames(
                  tier.featured ? 'bg-gray-900 ring-gray-900' : 'ring-gray-200',
                  'rounded-3xl p-8 ring-1 xl:p-10'
                )}
              >
                <h3
                  id={key.toString()}
                  className={classNames(
                    tier.featured ? 'text-white' : 'text-gray-900',
                    'text-lg font-semibold leading-8'
                  )}
                >
                  {tier.name}
                </h3>
                <p
                  className={classNames(
                    tier.featured ? 'text-gray-300' : 'text-gray-600',
                    'mt-4 text-sm leading-6'
                  )}
                >
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span
                    className={classNames(
                      tier.featured ? 'text-white' : 'text-gray-900',
                      'text-4xl font-bold tracking-tight'
                    )}
                  >
                    {typeof tier.price === 'string'
                      ? tier.price
                      : tier.price[frequency.value as keyof typeof tier.price]}
                  </span>
                  {typeof tier.price !== 'string' ? (
                    <span
                      className={classNames(
                        tier.featured ? 'text-gray-300' : 'text-gray-600',
                        'text-sm font-semibold leading-6'
                      )}
                    >
                      {frequency.priceSuffix}
                    </span>
                  ) : null}
                </p>
                <Button
                  title={tier.cta}
                  aria-describedby={key}
                  class={classNames(
                    'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    tier.featured
                      ? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
                      : 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
                    isEnterprise && 'opacity-100 cursor-default'
                  )}
                  onClick={() => createSubscription(tier.id)}
                  fetching={fetching}
                  disabled={!!state?.fetching}
                  hide={isEnterprise}
                />
                {isEnterprise && (
                  <p className="mt-4 font-extrabold text-sm text-indigo-600">
                    Coming soon
                  </p>
                )}
                <ul
                  role="list"
                  className={classNames(
                    tier.featured ? 'text-gray-300' : 'text-gray-600',
                    'mt-8 space-y-3 text-sm leading-6 xl:mt-10'
                  )}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className={classNames(
                          tier.featured ? 'text-white' : 'text-indigo-600',
                          'h-6 w-5 flex-none'
                        )}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
