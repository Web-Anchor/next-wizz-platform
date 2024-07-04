import Controller from './controller';
import AuthLayout from '@components/AuthLayout';
import { advancedSubRouteGuard } from '@server/route-protection';

export default async function Page() {
  await advancedSubRouteGuard();

  return (
    <AuthLayout>
      <Controller />
    </AuthLayout>
  );
}
