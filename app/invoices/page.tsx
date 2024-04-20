import { auth } from '@clerk/nextjs';
import Controller from './controller';

export default async function Page() {
  const { userId } = auth();

  return (
    <>
      <Controller />
    </>
  );
}
