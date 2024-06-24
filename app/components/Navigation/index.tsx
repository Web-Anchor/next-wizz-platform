'use client';

import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="z-10 w-full">
      {/* Static sidebar for desktop */}
      <DesktopNav />
      <MobileNav />
      <main className="flex flex-1 h-screen flex-col lg:pl-72">{children}</main>
    </section>
  );
}
