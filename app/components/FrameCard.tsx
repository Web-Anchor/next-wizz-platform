'use client';

import { useUser } from '@hooks/index';
import Link from 'next/link';

export default function FrameCard() {
  const { user } = useUser({});

  return (
    <div className="card bg-base-100 w-[360px] mx-auto shadow-xl">
      <p className="text-sm text-gray-800 text-center my-2 mx-3">
        Provide your customers with easy access to their invoices through a
        dedicated portal.{' '}
      </p>
      <section
        className="relative h-[300px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={process.env.NEXT_PUBLIC_PORTAL_URL}
          allowFullScreen
          className="scale-[0.25] w-[1440px] h-[1200px] origin-top-left"
        />
      </section>
      <div className="card-body">
        <p className="text-xs text-gray-500">
          Enhance your customer experience with our dedicated Customer Portal.
          Your customers can effortlessly access and download their invoices at
          their convenience, 24/7. Simplify their billing process and build
          stronger relationships with a seamless, user-friendly interface
          designed for their needs.
        </p>
        <div className="card-actions justify-end lg:justify-start">
          <Link
            href={`${process.env.NEXT_PUBLIC_PORTAL_URL}/?id=${user?.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal text-indigo-600 hover:text-indigo-500 self-center"
          >
            Customer Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
