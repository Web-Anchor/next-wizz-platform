import Layout from '@components/Layout';
import Pricing from '@components/Pricing';
import FeatureSections from '@components/FeatureSections';
import FrequentlyAskedQuestions from '@components/FrequentlyAskedQuestions';
import Workflow from '@components/Workflow';
import CustomerWorkflow from '@components/CustomerWorkflow';
import { TopBackground, BottomBackground } from '@components/Background';
import TestimonialsWhiteGrid from '@components/TestimonialsWhiteGrid';
import { SectionWrapper } from '@components/Wrapper';
import Analytics from '@components/Analytics';
import VideoWalkthrough from '@components/VideoWalkthrough';
import SimpleOnBg from '@components/SimpleOnBg';

export default function Page() {
  return (
    <Layout>
      <TopBackground />
      <BottomBackground />

      <SectionWrapper>
        <FeatureSections />
        <SimpleOnBg
          description={[
            'Experience the convenience and efficiency of modern invoicing with our Stripe-powered platform. Join us today and discover how our platform simplifies your billing process. From viewing transactions, invoicing and more to making necessary adjustments, our invoicing solution ensures that your financial management is both efficient and effective. Empower yourself with modern invoicing - start simplifying your billing process now!',
          ]}
        />
        <Pricing cardWrapperClass="lg:flex-nowrap" />
        <SimpleOnBg
          title="Keep it simple, keep it organized"
          description={[
            'Building on the ease of managing your financial activities from a central location, our platform allows you to connect your Stripe account via API, view transactions, download and adjust invoices, and track payments with precision. Our dedicated space provides an intuitive interface where you can handle all your invoicing needs, keeping your records organized and up-to-date.',
            'Enhance your productivity and efficiency with our intuitive invoicing app designed to simplify your workflow. Experience seamless invoicing from creation to payment with our user-friendly platform.',
          ]}
          slogan="A better workflow"
        />
        <Workflow />
        <SimpleOnBg
          description={[
            'Experience the seamless integration of our invoicing platform with your daily operations, making your financial management tasks simpler and more efficient. With features like self-print and 24/7 access to invoicing to your customers, our platform ensures that your invoicing process is always at your fingertips, ready to enhance your productivity.',
          ]}
        />
        <VideoWalkthrough />
        <SimpleOnBg
          description={[
            'Take advantage of our self-print feature, allowing your customers to access and download their invoices anytime, anywhere. With 24/7 access to invoicing, your customers can conveniently manage their billing tasks, enhancing their overall experience with your business.',
          ]}
        />
        <CustomerWorkflow />
        <SimpleOnBg
          title="Empower Your Business with Modern Invoicing Solutions"
          description={[
            'Enhance your productivity with personalized invoice templates and detailed analytics that provide insights into your financial performance. Our platform empowers you to make informed decisions and maintain control over your business finances with ease.',
            'Join us today and experience a revolution in invoicing and financial management. Let our platform simplify your finances and empower your business, so you can focus on what truly matters.',
          ]}
          slogan="Empowering You, One Click at a Time!"
        />
        <Analytics />
        <SimpleOnBg
          description={[
            'Our intuitive dashboard provides real-time updates on transaction volumes, revenue growth, and customer engagement metrics, empowering you to streamline operations and maximize profitability. From identifying revenue opportunities to improving customer retention, leverage actionable insights to stay ahead in today`s competitive landscape. Transform data into actionable intelligence and unlock the full potential of your invoicing process with our powerful analytics tools.',
          ]}
        />
        <FrequentlyAskedQuestions />
        <TestimonialsWhiteGrid />
      </SectionWrapper>
    </Layout>
  );
}
