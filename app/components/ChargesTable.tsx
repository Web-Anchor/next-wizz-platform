import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/20/solid';
import { Charge } from '../../types/index';
import { classNames, convertToYearMonthDay } from '@helpers/index';
import Link from 'next/link';

const statuses = {
  succeeded: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
};

type Props = {
  charges?: Charge[];
};

export default function ChargesTable(props: Props) {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
          Recent activity
        </h2>
      </div>
      <div className="mt-6 overflow-hidden border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <table className="w-full text-left">
              <thead className="sr-only">
                <tr>
                  <th>Amount</th>
                  <th className="hidden lg:table-cell">Client</th>
                  <th>More details</th>
                </tr>
              </thead>
              <tbody>
                {props?.charges?.map((charge, key) => (
                  <tr key={key}>
                    <td className="relative py-5 pr-6">
                      <div className="flex gap-x-6">
                        <ArrowUpCircleIcon
                          className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                          aria-hidden="true"
                        />
                        <div className="flex-auto">
                          <div className="flex items-start gap-x-3">
                            <div className="text-sm font-medium leading-6 text-gray-900">
                              {charge.amount}
                            </div>
                            <div
                              className={classNames(
                                statuses[
                                  charge?.status as keyof typeof statuses
                                ],
                                'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                              )}
                            >
                              {charge.status}
                            </div>
                          </div>
                          {charge?.billing_details?.email && (
                            <div className="mt-1 text-xs leading-5 text-gray-500">
                              {charge?.billing_details?.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                      <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                    </td>
                    <td className="hidden py-5 pr-6 md:table-cell">
                      <div className="text-sm leading-6 text-gray-900">
                        {charge?.calculated_statement_descriptor}
                      </div>
                      <div className="mt-1 text-xs leading-5 text-gray-500">
                        {convertToYearMonthDay(charge?.created!)}
                      </div>
                    </td>
                    <td className="py-5 text-right">
                      <div className="flex justify-end">
                        <Link
                          href={charge.receipt_url!}
                          className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                          target="_blank"
                        >
                          View
                          <span className="hidden sm:inline">
                            {' '}
                            transaction receipt
                          </span>
                          <span className="sr-only">
                            , invoice #{charge?.id},{' '}
                            {charge?.billing_details?.name}
                          </span>
                        </Link>
                      </div>
                      <div className="mt-1 text-xs leading-5 text-gray-500">
                        Invoice{' '}
                        <span className="text-gray-900">{charge.id}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
