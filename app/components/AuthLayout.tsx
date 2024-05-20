import Breadcrumbs from '@components/Breadcrumbs';
import Footer from '@components/Footer';
import Navigation from '@components/Navigation';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Navigation>
      <Breadcrumbs class="hidden lg:block" />
      <section className="flex flex-1">{children}</section>
      <Footer />
    </Navigation>
  );
}
