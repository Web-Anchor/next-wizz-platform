import {
  CloudArrowUpIcon,
  FingerPrintIcon,
  CursorArrowRaysIcon,
  UserGroupIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

const features = [
  {
    name: 'Invoicing Made Simple.',
    description:
      'Streamline your invoicing process with our user-friendly platform. Easily generate, send, and track invoices all in one place. Get real-time insights into your financial activities for better decision-making.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Document Management.',
    description:
      'Access and download important documents anytime, anywhere. Organize and store your financial records securely in your dedicated space. Stay organized with easy document categorization and search functionalities.',
    icon: UserGroupIcon,
  },
  {
    name: 'Transaction Tracking.',
    description:
      'Monitor your transactions effortlessly with our intuitive interface. Keep track of payments, expenses, and outstanding balances seamlessly. Gain a comprehensive overview of your financial status at a glance.',
    icon: SwatchIcon,
  },
  {
    name: 'User-Friendly Interface',
    description:
      'Navigate our intuitive platform with ease, making invoicing a smooth and efficient experience.',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Secure and Reliable.',
    description:
      'Rest assured that your financial data is secure with our advanced encryption methods. Benefit from regular backups and data protection measures for peace of mind. Trust in our platform`s reliability to support your financial management needs.',
    icon: FingerPrintIcon,
  },
];

export default function FeatureSectionsWithProductDark() {
  return (
    <div className="overflow-hidden bg-gray-800 py-20 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <section>
          <h2 className="text-xl font-semibold leading-7 text-indigo-400">
            Empowering Your Financial Success
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Effortless Financial Management Features
          </p>
          <p className="mt-6 text-md leading-8 text-gray-300">
            Explore a Range of Powerful Tools Designed to Simplify Your
            Financial Tasks. From Streamlining Invoicing to Secure Document
            Management and Intuitive Transaction Tracking, Our Platform Puts You
            in Control of Your Finances.
          </p>
        </section>
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="lg:pr-8 lg:pt-4 flex-2 lg:max-w-lg">
            <dl className="mt-10 w-auto md:w-[20rem] lg:w-[28rem] space-y-8 text-base leading-7 text-gray-300">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col relative pl-9">
                  <dt className="inline font-semibold text-white">
                    <feature.icon
                      className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="inline text-xs">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="m-auto lg:max-w-2xl sm:mx-0 mt-10 sm:max-w-none">
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_CDN}/FfNPG8nwlceFcbMGt6p3LQBCOwKpvx1jA5UlWR5mT8g.png`}
              alt="Product screenshot"
              width={2432}
              height={1842}
              className="w-[57rem] max-w-none rounded-tl-3xl bg-gray-800 ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
