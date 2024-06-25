'use client';

import Image from 'next/image';
import {
  CloudArrowUpIcon,
  ServerIcon,
  SwatchIcon,
  PlusCircleIcon,
  BoltIcon,
} from '@heroicons/react/20/solid';

const features = [
  {
    name: 'Efficiency.',
    description:
      'Optimize your workflow by easily creating, sending, and managing invoices in a streamlined manner.',
    icon: BoltIcon,
  },
  {
    name: 'Organization.',
    description:
      'Keep your invoicing process organized with a centralized platform that allows you to track payments and manage invoices effortlessly.',
    icon: ServerIcon,
  },
  {
    name: 'Accessibility.',
    description:
      'Access your invoicing tools anytime, anywhere, making it convenient to stay on top of your billing tasks.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Customization.',
    description:
      'Tailor your invoicing workflow to fit your unique branding and style with customizable templates and settings.',
    icon: SwatchIcon,
  },
  {
    name: 'Integration.',
    description:
      'Seamlessly integrate with Stripe API`s to enhance your workflow and create a more interconnected invoicing ecosystem for your business.',
    icon: PlusCircleIcon,
  },
];

export default function Workflow() {
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
                  A better workflow
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Enhance your productivity and efficiency with our intuitive
                  invoicing app designed to simplify your workflow. Experience
                  seamless invoicing from creation to payment with our
                  user-friendly platform.
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
                  src={`${process.env.NEXT_PUBLIC_STORAGE_CDN}/dashboard.png`}
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
