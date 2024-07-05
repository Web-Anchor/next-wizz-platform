'use client';

import { classNames } from '@helpers/index';
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
      'Enable easy access to invoices through a dedicated customer portal. Empower users to access and download their invoices at their convenience.',
    icon: UserGroupIcon,
  },
  {
    name: 'Seamless Stripe API Integration',
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
    name: 'Comprehensive Reporting & Analytics',
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
        <div className="mx-auto max-w-4xl lg:text-center">
          <h2 className="text-xl font-semibold leading-7 text-indigo-600">
            Invoicing Made Easy
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
            Streamline Your Invoicing Process with {stripeBrand()} Integration
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Streamline your invoicing process with our dedicated, user-friendly
            platform, powered by {stripeBrand()}. Effortlessly connect your{' '}
            {stripeBrand()} account via API to integrate with all your customers
            and payments. Empower your customers to access invoices at their
            convenience, making the billing process hassle-free and efficient.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform, built on the robust and secure {stripeBrand()}{' '}
            infrastructure, empowers you to take full control of your invoicing
            services. Featuring a dedicated customer portal, secure integration
            with the {stripeBrand()} API, customizable templates, and detailed
            reporting & analytics, you can ensure a seamless invoicing
            experience.
          </p>
        </div>

        <div className="lg:mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-5 lg:max-w-none lg:grid-cols-2 lg:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-800">
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

function stripeBrand() {
  return <span className="text-indigo-600">Stripe</span>;
}
