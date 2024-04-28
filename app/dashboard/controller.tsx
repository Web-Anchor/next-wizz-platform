'use client';

import Wrapper from '@app/components/Wrapper';
import { useTotalCharges, useTotalCustomers } from '@hooks/stats';
import { CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/20/solid';
import { convertToK } from '@helpers/index';

export default function Page() {
  const { charges } = useTotalCharges({});
  const { customers } = useTotalCustomers({});
  console.log(`Stats `, customers);

  return (
    <Wrapper>
      <div className="stats text-primary-content">
        <div className="stat">
          <div className="stat-figure">
            <CurrencyDollarIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <div className="stat-title">Charges</div>
          <div className="stat-value">{convertToK(charges)}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure">
            <UserGroupIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <div className="stat-title">Customers</div>
          <div className="stat-value">{convertToK(customers)}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure">
            <UserGroupIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </Wrapper>
  );
}
