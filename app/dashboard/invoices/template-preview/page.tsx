import AuthLayout from '@components/AuthLayout';
import Controller from './controller';

export default async function Page(props: { searchParams: { id: string } }) {
  return (
    <AuthLayout>
      <Controller />
    </AuthLayout>
  );
}
