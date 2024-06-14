import { classNames } from '@helpers/index';

type Props = {
  title?: string | number;
  description?: string;
  tooltip?: string;
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
  onClick?: (props?: any) => void;
  class?: string;
  hide?: boolean;
};

export default function Badge(props: Props): React.ReactElement | null {
  if (props.hide) {
    return null;
  }

  return (
    <section
      className="flex flex-row gap-2 tooltip tooltip-bottom"
      data-tip={props.tooltip}
    >
      <span
        className={classNames(
          'inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600',
          props.type === 'success' && 'bg-green-100 text-green-800',
          props.type === 'warning' && 'bg-yellow-100 text-yellow-800',
          props.type === 'error' && 'bg-red-100 text-red-800',
          props.type === 'info' && 'bg-blue-100 text-blue-800',
          props.class
        )}
        onClick={() => props.onClick?.()}
      >
        <svg
          className={classNames(
            'h-1.5 w-1.5 fill-gray-500',
            props.type === 'success' && 'fill-green-500',
            props.type === 'warning' && 'fill-yellow-500',
            props.type === 'error' && 'fill-red-500',
            props.type === 'info' && 'fill-blue-500'
          )}
          viewBox="0 0 6 6"
          aria-hidden="true"
        >
          <circle cx={3} cy={3} r={3} />
        </svg>
        {props.title}
      </span>
      {props.description && (
        <span className="text-xs text-gray-500 self-center">
          {props.description}
        </span>
      )}
    </section>
  );
}
