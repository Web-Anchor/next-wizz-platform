'use client';

import {
  CloudArrowUpIcon,
  FingerPrintIcon,
  CursorArrowRaysIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

const features = [
  {
    name: 'Effortless Invoicing',
    description:
      'Seamlessly connect your Stripe account via API and send invoices directly to your customers with ease.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Convenient Self-Printing',
    description:
      'Empower users to access and download their invoices at their convenience, making the billing process hassle-free.',
    icon: UserGroupIcon,
  },
  {
    name: 'Secure Integration',
    description:
      'Enjoy the security of Stripe`s robust API`s integrated into our app, ensuring safe and reliable interactions.',
    icon: FingerPrintIcon,
  },
  {
    name: 'User-Friendly Interface',
    description:
      'Navigate our intuitive platform with ease, making invoicing a smooth and efficient experience for both you and your customers.',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Customizable Templates',
    description:
      'Personalize your invoices with customizable templates to reflect your brand identity and create a professional image for your business.',
    icon: SwatchIcon,
  },
  {
    name: 'Detailed Reporting',
    description:
      'Gain insights into your invoicing activities with detailed reporting features, allowing you to track payments, pending invoices, and overall financial performance easily.',
    icon: ArrowTrendingUpIcon,
  },
];

export default function FeatureSections() {
  const path = usePathname();

  return (
    <div className="py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Invoicing made easy
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Streamline your invoicing process with our user-friendly platform.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Connect your Stripe account via API and start sending invoices
            directly to your customers effortlessly. Take control of your
            invoicing with our self-print feature. Easily access and download
            your invoices anytime, anywhere with just a click.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Join us today and experience the convenience of modern invoicing.
            Start simplifying your billing process now!
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
