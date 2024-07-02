import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Nunito } from 'next/font/google';
import './globals.css';
import { classNames } from '@helpers/index';
import { Toaster } from 'sonner';

const fonts = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'invoicio.io',
  description: 'Invoicing platform for freelancers and small businesses.',
  openGraph: {
    title: 'invoicio.io',
    description: 'Invoicing platform for freelancers and small businesses.',
    type: 'website',
    locale: 'en_US',
    url: 'invoicio.io',
    images: ['/og-image.png'],
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
        <body className={classNames(fonts.className, 'h-full')}>
          <Toaster
            // richColors // enable rich colors
            // closeButton // close button cta on toast
            position="top-center" // toast position
          />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
