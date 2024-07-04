import { subRouteGuard } from '@server/route-protection';
import Controller from './controller';
import AuthLayout from '@components/AuthLayout';

export default async function Page() {
  await subRouteGuard();

  return (
    <AuthLayout>
      <Controller />
    </AuthLayout>
  );
}
