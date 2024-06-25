'use client';

import Image from 'next/image';
import { CheckBadgeIcon } from '@heroicons/react/20/solid';

const features = [
  {
    name: 'Transaction Monitoring.',
    description:
      'Instantly track Stripe account charges, providing insights into revenue generation.',
    icon: CheckBadgeIcon,
  },
  {
    name: 'Customer Behavior Analysis.',
    description:
      'Analyze user stats to understand customer preferences, behaviors, and trends, enabling targeted marketing strategies and personalized customer experiences.',
    icon: CheckBadgeIcon,
  },
  {
    name: 'Revenue and Growth Metrics.',
    description:
      'Visualize revenue trends and growth metrics with customizable dashboards, empowering proactive decision-making and financial planning.',
    icon: CheckBadgeIcon,
  },
  {
    name: 'Subscription Management',
    description:
      'Streamline subscription tracking and management through automated insights, enabling businesses to optimize subscription offerings, improve retention rates, and forecast recurring revenue more effectively.',
    icon: CheckBadgeIcon,
  },
];

export default function Analytics() {
  return (
    <div className="overflow-hidden py-6 sm:py-10">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
            <div className="max-w-2xl lg:max-w-lg">
              <section className="lg:text-center">
                <h2 className="text-xl font-semibold leading-7 text-indigo-600">
                  Streamline Your Invoicing Process with Ease
                </h2>
                <p className="mt-2 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
                  Empower Your Business with Advanced Analytics
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Gain deep insights into your financial operations with our
                  advanced analytics feature. Track Stripe account charges and
                  user statistics effortlessly to make informed decisions that
                  drive your business forward. Visualize trends, monitor revenue
                  streams, and optimize your invoicing strategy with
                  comprehensive data analytics.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Our intuitive dashboard provides real-time updates on
                  transaction volumes, revenue growth, and customer engagement
                  metrics, empowering you to streamline operations and maximize
                  profitability. From identifying revenue opportunities to
                  improving customer retention, leverage actionable insights to
                  stay ahead in today`s competitive landscape. Transform data
                  into actionable intelligence and unlock the full potential of
                  your invoicing process with our powerful analytics tools.
                </p>
              </section>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-800">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="sm:px-6 lg:px-0 my-auto">
            <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 lg:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 max-w-none">
              <div
                className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                aria-hidden="true"
              />
              <div className="mx-auto lg:max-w-2xl sm:mx-0 sm:max-w-none">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_CDN}/dashboard-analytics.png`}
                  alt="Product screenshot"
                  width={2432}
                  height={1842}
                  className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
