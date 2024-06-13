import Header from '@app/components/Header';
import Footer from '@components/Footer';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative overflow-hidden__ flex min-h-screen mx-auto max-w-7xl flex-col">
      <Header />
      <section className="flex-auto pt-14 sm:pt-10">{children}</section>
      <Footer />
    </main>
  );
}
