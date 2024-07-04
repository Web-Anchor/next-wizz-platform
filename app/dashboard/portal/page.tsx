import { advancedSubRouteGuard } from '@server/route-protection';
import Controller from './controller';
import AuthLayout from '@components/AuthLayout';

export default async function Page() {
  await advancedSubRouteGuard();

  return (
    <AuthLayout>
      <Controller />
    </AuthLayout>
  );
}
