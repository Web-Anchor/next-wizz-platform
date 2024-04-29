export default function Wrapper({ children }: { children?: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 sm:gap-10 px-4 sm:px-6 lg:px-8">
      {children}
    </section>
  );
}
