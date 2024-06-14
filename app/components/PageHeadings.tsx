import { classNames } from '@helpers/index';

type Props = {
  title?: string;
  description?: string;
  slogan?: string;
  class?: string;
};

export default function PageHeadings(props: Props): React.ReactElement {
  return (
    <section
      className={classNames(
        'w-full max-w-none lg:max-w-4xl flex flex-col gap-3',
        props?.class
      )}
    >
      {props?.title && (
        <h2 className="font-bold text-xl leading-6 text-gray-800 lg:mx-0 ">
          {props?.title}
        </h2>
      )}
      {props?.description && (
        <p className="text-sm text-gray-500">{props?.description}</p>
      )}
      {props?.slogan && (
        <h2 className="font-xs leading-6 text-indigo-600 lg:mx-0 lg:max-w-none">
          {props?.slogan}
        </h2>
      )}
    </section>
  );
}
