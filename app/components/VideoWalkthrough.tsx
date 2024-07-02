'use client';

export default function VideoWalkthrough() {
  return (
    <div className="py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl lg:text-center">
          <h2 className="text-xl font-semibold leading-7 text-indigo-600">
            Simplify Your Finances, Empower Your Business
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
            Effortless Invoicing and Financial Management
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover how our intuitive web application can revolutionize your
            invoicing and financial management. Our platform offers a
            comprehensive suite of tools to streamline your workflow and keep
            you in control.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From real-time data access and seamless transaction monitoring to
            personalized invoices and comprehensive analytics, our platform is
            designed with efficiency and simplicity in mind. Easily connect your
            Stripe account via API to start sending invoices directly to your
            customers. Monitor all your transactions in real-time, ensuring
            accuracy and transparency in your financial dealings.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Take advantage of our self-print feature, allowing your customers to
            access and download their invoices anytime, anywhere. With 24/7
            access to invoicing, your customers can conveniently manage their
            billing tasks, enhancing their overall experience with your
            business.
          </p>
        </div>

        <div className="lg:mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl rounded-lg overflow-hidden">
          <video controls preload="metadata">
            <source
              src={`${process.env.NEXT_PUBLIC_STORAGE_CDN}/W7oSjRoSvH55TT2ukJjhx1Zi9pLzmWXorPqYcjPlHQc.mp4`}
              type="video/mp4"
            />
            <track
              // src="/path/to/captions.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
