'use client';

import {
  PrinterIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';

export default function CustomerWorkflow() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <img
              className="absolute inset-0 h-full w-full bg-gray-50 object-cover"
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80"
              alt=""
            />
          </div>
        </div>
        <div className="px-6 lg:contents">
          <div className="mx-auto max-w-2xl pb-12 pt-16 sm:pb-12 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
            <p className="text-base font-semibold leading-7 text-indigo-600">
              Customer Workflow
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
              Self-Service Invoicing Made Simple
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-700">
              Simplify your invoicing experience with our user-friendly platform
              that empowers customers to effortlessly self-print and download
              their invoices anytime, anywhere. Say goodbye to waiting for
              manual requests and embrace the convenience of self-service access
              to your billing documents.
            </p>
            <div className="mt-10 max-w-xl text-base leading-7 text-gray-700 lg:max-w-none">
              <p>
                With just a few clicks, customers can access their personalized
                invoice portal, view their billing history, and download
                invoices in various formats. Our intuitive interface ensures a
                seamless experience, allowing customers to take control of their
                invoicing needs with ease.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <PrinterIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-800">
                      Effortless Self-Printing.
                    </strong>{' '}
                    Empower customers to access and download their invoices
                    easily, providing a hassle-free experience for managing
                    billing documents.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CursorArrowRaysIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-800">
                      Convenient Accessibility.
                    </strong>{' '}
                    Ensure customers can self-print invoices at their
                    convenience, eliminating the need to wait for manual
                    requests and allowing them to retrieve documents anytime,
                    anywhere.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <UserGroupIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-800">
                      User-Friendly Interface.
                    </strong>{' '}
                    Offer a simple and intuitive platform that enables customers
                    to navigate their invoice portal effortlessly, making
                    self-service invoicing a seamless and enjoyable process.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <FingerPrintIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-800">
                      Control and Convenience.
                    </strong>{' '}
                    Provide customers with the autonomy to manage their
                    invoicing needs independently, enhancing their satisfaction
                    and overall experience with your invoicing system.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Enjoy the freedom to manage your invoices on your own terms. Our
                platform puts the power in your hands, enabling you to retrieve
                and print invoices at your convenience, eliminating unnecessary
                delays and enhancing your overall satisfaction.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-800">
                Discover the Ease of Self-Service Invoicing
              </h2>
              <p className="mt-6">
                Experience the convenience of modern invoicing solutions
                tailored to meet your needs. Join us today and discover the ease
                of self-service invoicing that puts you in the driver`s seat of
                your billing process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
