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
import Pricing from '@components/Pricing';
import { TableSkeleton } from '@app/components/Skeleton';
import PageHeadings from '@app/components/PageHeadings';

export default function Page() {
  const { user } = useUser({});
  const { charges } = useTotalCharges({});
  const { customers } = useTotalCustomers({});
  const { data: statsCustomers } = useCustomersMonthGrowth({});
  const { data: statsCharges } = useChargesMonthGrowth({});
  const { subscriptions, isLoading } = useSubscriptions({});
  console.log('Subs ', subscriptions);
  console.log(`user `, user);

  if (isLoading) {
    return (
      <Wrapper>
        <TableSkeleton />
      </Wrapper>
    );
  }

  if (!subscriptions) {
    // --------------------------------------------------------------------------------
    // 📌  Fallback Component if no subscriptions
    // --------------------------------------------------------------------------------
    return (
      <Wrapper>
        <Pricing />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <PageHeadings
        title="Dashboard. Your Central Hub for Insights and Control."
        description="Access real-time data, analytics, and key metrics on our Dashboard, empowering you with valuable insights to make informed decisions. Monitor performance, track trends, and stay in control of your operations from a centralized platform designed to streamline your workflow."
        slogan="Invoice Smarter, Grow Stronger - Empowering Your Business!"
      />

      <section className="flex flex-1 flex-row gap-5 flex-wrap">
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
      </section>

      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New movie is released!</h2>
          <p>Click the button to watch on Jetflix app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
