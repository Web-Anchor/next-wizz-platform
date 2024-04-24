import Breadcrumbs from '@components/Breadcrumbs';
import Header from '@app/components/Header';
import Footer from '@components/Footer';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen max-w-7xl flex-col">
      <Header />
      <Breadcrumbs />
      <section className="flex-auto pt-6 bg-slate-100">{children}</section>
      <Footer />
    </main>
  );
}
