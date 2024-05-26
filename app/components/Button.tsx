import { classNames } from '@helpers/index';

type Props = {
  title?: string;
  onClick?: (props?: any) => void;
  children?: React.ReactNode;
  fetching?: boolean;
  disabled?: boolean;
  class?: string;
  style?: 'primary' | 'secondary' | 'ghost' | 'badge' | 'link'; // Defaults to 'primary'
  type?: 'button' | 'submit' | 'reset';
  hide?: boolean;
};

export default function Button(props: Props): React.ReactElement {
  const content = props.children || props.title;

  if (props.hide) {
    return <></>;
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={classNames(
        'block relative rounded-md h-fit bg-slate-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700',
        props.style === 'secondary' &&
          'rounded-md bg-indigo-600 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        props.style === 'ghost' &&
          'bg-transparent inline-flex items-center border-b-2 border-transparent px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-transparent shadow-none',
        props.style === 'badge' &&
          'center relative inline-block select-none whitespace-nowrap rounded-lg bg-amber-500 text-white py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none',
        props.style === 'link' &&
          'bg-transparent px-0 py-0.5 text-sm font-semibold text-indigo-600 shadow-none hover:bg-transparent hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        props?.disabled && 'opacity-50 cursor-not-allowed',
        props.class
      )}
      disabled={props.disabled || props.fetching}
      onClick={() => props.onClick?.()}
    >
      {props.fetching && (
        <span
          className={classNames(
            'loading loading-spinner absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white',
            props.style === 'ghost' && 'text-gray-500'
          )}
        ></span>
      )}
      <span className={classNames(props.fetching && 'opacity-0')}>
        {content}
      </span>
    </button>
  );
}
