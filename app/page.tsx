import Layout from '@components/Layout';
import Pricing from '@components/Pricing';
import FeatureSections from '@components/FeatureSections';
import FrequentlyAskedQuestions from '@components/FrequentlyAskedQuestions';
import Workflow from '@components/Workflow';
import CustomerWorkflow from '@components/CustomerWorkflow';
import { TopBackground, BottomBackground } from '@components/Background';
import TestimonialsWhiteGrid from './components/TestimonialsWhiteGrid';
import { SectionWrapper } from '@components/Wrapper';

export default function Page() {
  return (
    <Layout>
      <TopBackground />
      <BottomBackground />

      <SectionWrapper>
        <FeatureSections />
        <Pricing />
        <Workflow />
        <CustomerWorkflow />
        <FrequentlyAskedQuestions />
        <TestimonialsWhiteGrid />
      </SectionWrapper>
    </Layout>
  );
}
