import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Controller from './controller';

export default async function Page() {
  const { userId } = auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <>
      <Controller />
    </>
  );
}
