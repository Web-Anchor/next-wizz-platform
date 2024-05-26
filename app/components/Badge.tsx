import { classNames } from '@helpers/index';

type Props = {
  title?: string | number;
  description?: string;
  onClick?: (props?: any) => void;
  class?: string;
  hide?: boolean;
};

export default function Badge(props: Props): React.ReactElement {
  if (props.hide) {
    return <></>;
  }

  return (
    <section className="flex flex-row gap-2">
      <span
        className={classNames(
          'inline-flex w-fit items-center gap-x-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700',
          props.class
        )}
        onClick={() => props.onClick?.()}
      >
        <svg
          className="h-1.5 w-1.5 fill-green-500"
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
