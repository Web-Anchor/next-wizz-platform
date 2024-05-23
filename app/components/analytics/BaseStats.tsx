'use client';

import Wrapper from '@app/components/Wrapper';
import {
  useChargesMonthGrowth,
  useCustomersMonthGrowth,
  useTotalCharges,
  useTotalCustomers,
} from '@hooks/stats';
import StatsCard from '@app/components/StatsCard';
import NumbersCard from '@app/components/NumbersCard';
import { useSubscriptions, useUser } from '@hooks/index';
import { TableSkeleton } from '@app/components/Skeleton';
import { cFetch } from '@lib/cFetcher';
import Button from '../Button';

export default function BaseStats() {
  // const { user } = useUser({});
  // const { charges } = useTotalCharges({});
  // const { customers } = useTotalCustomers({});
  // const { data: statsCustomers } = useCustomersMonthGrowth({});
  // const { data: statsCharges } = useChargesMonthGrowth({});
  // const { subscriptions, isLoading } = useSubscriptions({});

  // if (isLoading) {
  //   return (
  //     <Wrapper>
  //       <TableSkeleton />
  //     </Wrapper>
  //   );
  // }

  async function testHandler() {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------

      const { data, status } = await cFetch({
        url: '/api/v1/stripe/stats/base-stats',
        method: 'POST',
        data: {},
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
      }

      console.log('🚧 API Stats ', data);

      // toast.success(`API key deleted successfully`);
    } catch (err: any) {
      console.error(err);
    }
  }

  return (
    <section className="flex flex-1 flex-col gap-10">
      <Button onClick={testHandler}>Test</Button>

      {/* <section className="flex flex-1 flex-row gap-5 flex-wrap">
        <NumbersCard number={customers} icon="customers" title="Customers" />
        <NumbersCard number={charges} icon="payments" title="Charges" />
        <NumbersCard number={charges} icon="payments" title="Charges" />
      </section>

      <section>
        <h3 className="text-base font-semibold leading-6 text-gray-900 mb-5">
          Last 30 days
        </h3>

        <section className="flex flex-1 flex-row gap-5 flex-wrap">
          <StatsCard
            currentTotal={statsCustomers?.currentTotalCustomers}
            previousTotal={statsCustomers?.previousTotalCustomers}
            percentage={statsCustomers?.percentage}
            type="customers"
            link="/dashboard/customers"
          />
          <StatsCard
            currentTotal={statsCharges?.currentTotalCharges}
            previousTotal={statsCharges?.previousTotalCharges}
            percentage={statsCharges?.percentage}
            type="payments"
            link="/dashboard/charges"
          />
        </section>
      </section> */}
    </section>
  );
}
