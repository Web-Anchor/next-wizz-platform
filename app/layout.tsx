import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Breadcrumbs from '@components/Breadcrumbs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoice Visard',
  description: 'Invoice Visard is a simple invoicing app for freelancers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Breadcrumbs />
        {children}
      </body>
    </html>
  );
}
