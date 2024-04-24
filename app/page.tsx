import Pricing from '@components/Pricing';
import FeatureSections from '@components/FeatureSections';
import FrequentlyAskedQuestions from '@components/FrequentlyAskedQuestions';
import Layout from '@components/Layout';

export default function Page() {
  return (
    <Layout>
      <FeatureSections />
      <Pricing />
      <FrequentlyAskedQuestions />
    </Layout>
  );
}
