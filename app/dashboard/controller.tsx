'use client';

import Wrapper from '@app/components/Wrapper';
import {
  useChargesMonthGrowth,
  useCustomersMonthGrowth,
  useTotalCharges,
  useTotalCustomers,
} from '@hooks/stats';
import { CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/20/solid';
import { classNames, convertToK } from '@helpers/index';
import StatsCard from '@app/components/StatsCard';
import NumbersCard from '@app/components/NumbersCard';

export default function Page() {
  const { charges } = useTotalCharges({});
  const { customers } = useTotalCustomers({});
  const { data: statsCustomers, isLoading: customersLoading } =
    useCustomersMonthGrowth({});
  const { data: statsCharges, isLoading: chargesLoading } =
    useChargesMonthGrowth({});
  console.log(`Stats `, charges, customers);

  return (
    <Wrapper>
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
