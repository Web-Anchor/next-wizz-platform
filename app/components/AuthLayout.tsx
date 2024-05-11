import Breadcrumbs from '@components/Breadcrumbs';
import Header from '@app/components/Header';
import Footer from '@components/Footer';
import Navigation from '@components/Navigation';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-row z-10">
      <Navigation />
      <section className="flex flex-1 flex-col sm:ml-56">
        <Header class="sm:hidden" />
        <Breadcrumbs class="hidden sm:block" />
        <section className="flex-auto pt-20 sm:pt-6">{children}</section>
        <Footer />
      </section>
    </main>
  );
}
