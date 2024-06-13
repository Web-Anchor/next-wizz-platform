import { classNames } from '@helpers/index';
import { TableSkeleton } from '@components/Skeleton';
import NoData from './NoData';

type Row = { item?: string | React.ReactElement; class?: string };

type Props = {
  footer?: React.ReactElement;
  header?: Row[];
  data?: { row: Row[]; class?: string }[];
  fetching?: boolean;
  noDate?: { title?: string; description?: string };
};

export default function Table(props: Props) {
  if (props.fetching) {
    return <TableSkeleton />;
  }

  return (
    <div className="flex flex-col gap-5 px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-8 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              {props?.header?.map((item, key) => {
                return (
                  <th
                    key={key}
                    scope="col"
                    className={classNames(
                      'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0',
                      item.class
                    )}
                  >
                    {item.item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {!props?.data?.length && (
              <NoData
                title={props.noDate?.title ?? 'No Data Available'}
                description={
                  props.noDate?.description ??
                  'Data records will appear here when available.'
                }
              />
            )}

            {props?.data?.map((rows, key) => {
              return (
                <tr key={key}>
                  {rows?.row?.map((item, key) => {
                    return (
                      <td
                        key={key}
                        className={classNames(
                          'px-3 py-3.5 text-sm text-gray-800',
                          item.class
                        )}
                      >
                        {item.item}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {props.footer && (
        <div className="sm:flex sm:items-center">{props.footer}</div>
      )}
    </div>
  );
}
