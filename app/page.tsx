import Layout from '@components/Layout';
import Pricing from '@components/Pricing';
import FeatureSections from '@components/FeatureSections';
import FrequentlyAskedQuestions from '@components/FrequentlyAskedQuestions';
import Workflow from '@components/Workflow';
import CustomerWorkflow from '@components/CustomerWorkflow';
import { TopBackground, BottomBackground } from '@components/Background';
import TestimonialsWhiteGrid from './components/TestimonialsWhiteGrid';
import { SectionWrapper } from '@components/Wrapper';
import Analytics from './components/Analytics';
import VideoWalkthrough from './components/VideoWalkthrough';
import SimpleOnDark from './components/SimpleOnDark';

export default function Page() {
  return (
    <Layout>
      <TopBackground />
      <BottomBackground />

      <SectionWrapper>
        <FeatureSections />
        <Pricing cardWrapperClass="lg:flex-nowrap" />
        <SimpleOnDark
          title="Keep it simple, keep it organized"
          description={[
            'Building on the ease of managing your financial activities from a central location, our platform allows you to connect your Stripe account via API, view transactions, download and adjust invoices, and track payments with precision. Our dedicated space provides an intuitive interface where you can handle all your invoicing needs, keeping your records organized and up-to-date.',
            ' Enhance your productivity and efficiency with our intuitive invoicing app designed to simplify your workflow. Experience seamless invoicing from creation to payment with our user-friendly platform.',
          ]}
          slogan="A better workflow"
        />
        <Workflow />
        <VideoWalkthrough />
        <SimpleOnDark
          title="Empower Your Business with Modern Invoicing Solutions"
          description={[
            'Enhance your productivity with personalized invoice templates and detailed analytics that provide insights into your financial performance. Our platform empowers you to make informed decisions and maintain control over your business finances with ease.',
            'Join us today and experience a revolution in invoicing and financial management. Let our platform simplify your finances and empower your business, so you can focus on what truly matters.',
          ]}
          slogan="Empowering You, One Click at a Time!"
        />
        <CustomerWorkflow />
        <Analytics />
        <FrequentlyAskedQuestions />
        <TestimonialsWhiteGrid />
      </SectionWrapper>
    </Layout>
  );
}
