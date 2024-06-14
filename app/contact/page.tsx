import GoogleCaptchaWrapper from './GoogleCaptchaWrapper';
import Controller from './controller';
import Layout from '@components/Layout';

export default async function Page() {
  return (
    <Layout>
      <GoogleCaptchaWrapper>
        <Controller />
      </GoogleCaptchaWrapper>
    </Layout>
  );
}
