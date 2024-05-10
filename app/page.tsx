import Layout from '@components/Layout';
import Pricing from '@components/Pricing';
import FeatureSections from '@components/FeatureSections';
import FrequentlyAskedQuestions from '@components/FrequentlyAskedQuestions';
import Workflow from '@components/Workflow';

export default function Page() {
  return (
    <Layout>
      <FeatureSections />
      <Pricing />
      <Workflow />
      <FrequentlyAskedQuestions />
    </Layout>
  );
}
