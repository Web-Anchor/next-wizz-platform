import Pricing from '@components/Pricing';
import FrequentlyAskedQuestions from '@components/FrequentlyAskedQuestions';

export default function Page() {
  return (
    <section className="flex flex-col gap-10">
      <Pricing />
      <FrequentlyAskedQuestions />
    </section>
  );
}
