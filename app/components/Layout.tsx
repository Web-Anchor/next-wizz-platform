import Header from '@app/components/Header';
import Footer from '@components/Footer';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen mx-auto max-w-7xl flex-col">
      <Header />
      <section className="flex-auto pt-14 sm:pt-6 bg-slate-100">
        {children}
      </section>
      <Footer />
    </main>
  );
}
