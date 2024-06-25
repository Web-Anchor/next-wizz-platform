'use client';

import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

const faqs = [
  {
    question: 'How can I connect my Stripe account to the app?',
    answer:
      'Connecting your Stripe account is simple! Just go to the settings menu, select the payment integration option, and follow the prompts to link your account via API.',
  },
  {
    question: 'Can I customize the invoice templates?',
    answer:
      'Absolutely! Our app offers customizable templates to help you personalize your invoices and showcase your brand identity.',
  },
  {
    question: 'How do I access and download my invoices for self-printing?',
    answer:
      'You can easily access and download your invoices by logging into your account and navigating to the invoices section. From there, you can view and download any invoice you need.',
  },
  {
    question: 'Are payments processed securely through the app?',
    answer:
      'Yes, we ensure secure payment processing by integrating with Stripe`s reliable payment system, providing a safe and trustworthy transaction environment.',
  },
  {
    question: 'Can I set up automated reminders for overdue payments?',
    answer:
      'Yes, our app allows you to configure automated reminders for outstanding invoices, helping you stay on top of payments and improve your cash flow.',
  },
  {
    question: 'What kind of reporting features are available in the app?',
    answer:
      'Our app offers detailed reporting features that provide insights into your invoicing activities, allowing you to track payments, pending invoices, and overall financial performance effortlessly.',
  },
  {
    question:
      'Do higher-tier plans include all the features of lower-tier plans?',
    answer:
      'Yes, each subsequent plan includes all the features of the previous plans, ensuring that you have access to a cumulative set of benefits as you upgrade your subscription.',
  },
  {
    question: 'Is customer support available for all plans?',
    answer:
      'Yes, customer support is available for all our users. Enterprise plan subscribers, however, receive priority customer support for any queries or assistance they may need.',
  },
  {
    question: 'How can I upgrade or downgrade my subscription plan?',
    answer:
      'You can easily manage your subscription plan from your account settings. Simply select the plan you wish to switch to, and our system will guide you through the process seamlessly.',
  },
  // More questions...
];

export default function FrequentlyAskedQuestions() {
  const path = usePathname();

  return (
    <div id="facts">
      <div className="mx-auto max-w-7xl px-6 py-6 sm:py-10">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <div className="mx-auto max-w-4xl lg:text-center">
            <h2 className="text-xl font-semibold leading-7 text-indigo-600">
              FAQ
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
              Frequently asked questions
            </p>
          </div>

          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs?.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-800">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
