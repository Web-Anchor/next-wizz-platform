'use client';

import Image from 'next/image';

export default function CustomerWorkflow() {
  return (
    <div className="relative py-10">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="flex lg:hidden relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <Image
              className="absolute inset-0 h-full w-full bg-gray-50 object-cover"
              src={`${process.env.NEXT_PUBLIC_STORAGE_CDN}/koHuBM3ZpC5ZDLz3C0kIwVYwKpudvS8n3mj60BQMCw8.jpg`}
              alt="Entrepreneur working"
              fill
            />
          </div>
          <div className="hidden lg:flex relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <Image
              className="absolute inset-0 h-full w-full bg-gray-50 object-cover"
              src={`${process.env.NEXT_PUBLIC_STORAGE_CDN}/3ZzghmIBbJhKogoK5AKRHC8XGBGrW+nxnPFdoCDJ9e0.jpg`}
              alt="Entrepreneur working"
              fill
            />
          </div>
        </div>
        <div className="px-6 lg:contents">
          <div className="lg:mx-auto max-w-2xl sm:py-10 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none xl:w-1/2">
            <p className="text-xl font-semibold leading-7 text-indigo-600">
              Customization and Support, Tailored for You!
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
              Make It Yours: Customizable Customer Portal
            </h1>
            <section className="flex flex-col gap-5 mt-5 text-lg leading-8 text-gray-600">
              <p>
                Elevate your customer experience with our fully customizable
                dedicated customer portal. Our platform allows you to add your
                branding, ensuring that your customers see your bran`s identity
                at every touchpoint. Personalize your portal with custom brand
                messages to create a seamless and professional experience for
                your customers.
              </p>
              <p>
                Not only can you tailor the appearance of your portal, but you
                can also communicate your brand’s values and messages directly
                to your customers. Share updates, promotions, and important
                information effortlessly through your branded portal.
              </p>
              <p>
                Additionally, our platform is designed with your feedback in
                mind. Request new features to enhance your invoicing and
                financial management experience. Our support team is always
                ready to assist you with any questions or issues, ensuring that
                you have the help you need to maximize the potential of your
                customized portal.
              </p>
              <p>
                Join us today to create a unique and engaging customer
                experience that reflects your brand`s identity and values.
                Empower your business with a portal that`s truly yours.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
