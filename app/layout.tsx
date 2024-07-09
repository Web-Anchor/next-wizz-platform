import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Nunito } from 'next/font/google';
import './globals.css';
import { classNames } from '@helpers/index';
import { Toaster } from 'sonner';
import { CSPostHogProvider } from './posthog';

const fonts = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'invoicio.io - Invoicing Platform',
  description:
    'Invoicing platform for freelancers and small businesses. Manage your financial activities from one central location.',
  openGraph: {
    title: 'invoicio.io - Invoicing Platform',
    description:
      'Invoicing platform for freelancers and small businesses. Manage your financial activities from one central location.',
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    images: [
      {
        pathname: '/assets/og-image.png',
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/og-image.png`,
        width: 800,
        height: 400,
        alt: 'invoicio.io - Invoicing Platform',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="h-full bg-white text-gray-950 duration-300"
      data-theme="bumblebee"
      lang="en"
    >
      <ClerkProvider>
        <CSPostHogProvider>
          <body className={classNames(fonts.className, 'h-full')}>
            <Toaster
              // richColors // enable rich colors
              // closeButton // close button cta on toast
              position="top-center" // toast position
            />
            {children}
          </body>
        </CSPostHogProvider>
      </ClerkProvider>
    </html>
  );
}
