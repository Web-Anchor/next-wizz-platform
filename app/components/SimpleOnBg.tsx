import { classNames } from '@helpers/index';

type Props = {
  title?: string | number;
  description?: string[];
  slogan?: string;
  url?: string;
  class?: string;
  hide?: boolean;
  mode?: 'light' | 'dark';
};

export default function SimpleOnBg(props: Props): React.ReactElement | null {
  if (props.hide) {
    return null;
  }


  return (
    <div
      className={classNames(
        'px-5 py-10 sm:py-16 bg-gray-800',
        props.class,
        props.mode === 'light' && 'bg-transparent'
      )}
    >
      <section
        className={classNames('w-full lg:mx-auto max-w-3xl lg:text-center')}
      >
        {props.slogan && (
          <p
            className={classNames(
              'text-xl font-semibold leading-7 text-indigo-400',
              props.mode === 'light' && 'text-indigo-600'
            )}
          >
            {props.slogan}
          </p>
        )}
        {props.title && (
          <h2
            className={classNames(
              'mt-2 text-4xl font-bold tracking-tight sm:text-5xl text-white',
              props.mode === 'light' && 'text-gray-800'
            )}
          >
            {props.title}
          </h2>
        )}
        {props.description && (
          <section
            className={classNames(
              'mt-10 flex flex-col gap-2 text-lg leading-8 text-gray-200',
              props.mode === 'light' && 'text-gray-600',
              !props.title && 'mt-0'
            )}
          >
            {props.description.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </section>
        )}
      </section>
    </div>
  );
}
