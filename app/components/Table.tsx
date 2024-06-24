import { classNames } from '@helpers/index';
import { TableSkeleton } from '@components/Skeleton';
import NoData from '@components/NoData';
import Button from './Button';

type Row = { item?: string | React.ReactElement; class?: string };

type Props = {
  footer?: React.ReactElement;
  header?: Row[];
  data?: { row: Row[]; class?: string }[];
  fetching?: boolean;
  noDate?: { title?: string; description?: string };
  hasMore?: boolean;
  hasPrevious?: boolean;
  nextCallback?: () => void;
  prevCallback?: () => void;
  hidden?: boolean;
};

export default function Table(props: Props): React.ReactElement | null {
  if (props.fetching) {
    return <TableSkeleton />;
  }

  if (props.hidden) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              {props?.header?.map((item, key) => {
                return (
                  <th
                    key={key}
                    scope="col"
                    className={classNames(
                      'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-800 sm:pl-0',
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
                title={props.noDate?.title ?? "You don't have any templates."}
                description={
                  props.noDate?.description ?? 'Create a new template.'
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

        {(props.hasMore || props.hasPrevious) && (
          <div className="flex flex-1 justify-end my-5">
            {props.hasPrevious && (
              <Button
                onClick={props.prevCallback}
                fetching={props.fetching}
                class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
              >
                Previous
              </Button>
            )}
            {props.hasMore && (
              <Button
                onClick={props.nextCallback}
                fetching={props.fetching}
                class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
              >
                Next
              </Button>
            )}
          </div>
        )}
      </div>

      {props.footer && (
        <div className="sm:flex sm:items-center">{props.footer}</div>
      )}
    </div>
  );
}
