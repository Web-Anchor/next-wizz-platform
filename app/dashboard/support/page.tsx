import Controller from './controller';
import AuthLayout from '@components/AuthLayout';

export default async function Page() {
  return (
    <AuthLayout>
      <Controller />
    </AuthLayout>
  );
}
