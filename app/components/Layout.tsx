import Header from '@app/components/Header';
import Footer from '@components/Footer';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen mx-auto max-w-7xl flex-col">
      <Header />
      <section className="flex-auto pt-24 sm:pt-32">{children}</section>
      <Footer />
    </main>
  );
}
