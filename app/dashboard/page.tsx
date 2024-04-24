import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Controller from './controller';
import AuthLayout from '@components/AuthLayout';

export default async function Page() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <AuthLayout>
      <Controller />
    </AuthLayout>
  );
}
