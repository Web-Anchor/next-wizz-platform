import { TableCellsIcon } from '@heroicons/react/24/outline';

type Props = {
  title?: string;
  description?: string;
};

export default function NoData(props: Props): React.ReactElement {
  return (
    <tr>
      <td colSpan={1000}>
        <div className="text-center py-5">
          <div className="bg-indigo-500 text-white mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
            <TableCellsIcon className="h-8 w-8" aria-hidden="true" />
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            {props.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{props.description}</p>
        </div>
      </td>
    </tr>
  );
}
