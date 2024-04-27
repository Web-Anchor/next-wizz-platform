import { classNames } from '@helpers/index';

type Props = {
  title: string;
  onClick?: () => void;
  children?: React.ReactNode;
  fetching?: boolean;
  disabled?: boolean;
  class?: string;
  type?: 'primary' | 'secondary' | 'ghost'; // Defaults to 'primary'
};

export default function Button(props: Props): React.ReactElement {
  const content = props.children || props.title;

  return (
    <button
      className={classNames(
        'block relative rounded-md bg-slate-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700',
        props.type === 'secondary' &&
          'rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        props.type === 'ghost' &&
          'bg-transparent inline-flex items-center border-b-2 border-transparent px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-transparent shadow-none',
        props.class
      )}
      disabled={props.disabled || props.fetching}
      onClick={() => props.onClick?.()}
    >
      {props.fetching && (
        <span
          className={classNames(
            'loading loading-spinner absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white',
            props.type === 'ghost' && 'text-gray-500'
          )}
        ></span>
      )}
      <span className={classNames(props.fetching && 'opacity-0')}>
        {content}
      </span>
    </button>
  );
}
