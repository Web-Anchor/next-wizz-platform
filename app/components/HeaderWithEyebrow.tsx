import { classNames } from '@helpers/index';

type Props = {
  title?: string | number;
  description?: string;
  slogan?: string;
  url?: string;
  class?: string;
  hide?: boolean;
};

export default function HeaderWithEyebrow(
  props: Props
): React.ReactElement | null {
  if (props.hide) {
    return null;
  }

  return (
    <div
      className={classNames(
        'px-5 w-full lg:mx-auto max-w-3xl lg:text-center',
        props.class
      )}
    >
      {props.slogan && (
        <p className="text-xl font-semibold leading-7 text-indigo-600">
          {props.slogan}
        </p>
      )}
      {props.title && (
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
          {props.title}
        </h2>
      )}
      {props.description && (
        <p className="mt-6 text-lg leading-8 text-gray-600">
          {props.description}
        </p>
      )}
    </div>
  );
}
