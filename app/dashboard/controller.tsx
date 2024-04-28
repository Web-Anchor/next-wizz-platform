'use client';

import Wrapper from '@app/components/Wrapper';
import { useTotalCharges } from '@hooks/stats';
import {
  CurrencyDollarIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/20/solid';

export default function Page() {
  const { charges } = useTotalCharges({});
  console.log(`Stats `, charges);

  return (
    <Wrapper>
      <div className="stats text-primary-content">
        <div className="stat">
          <div className="stat-figure">
            <CurrencyDollarIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <div className="stat-title">Charges</div>
          <div className="stat-value">{charges}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure">
            <ArrowPathIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <div className="stat-title">Customers</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </Wrapper>
  );
}
