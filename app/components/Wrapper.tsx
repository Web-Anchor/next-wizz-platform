import { classNames } from '@helpers/index';

type Wrapper = { children?: React.ReactNode; class?: string; hidden?: boolean };

export default function Wrapper(props: Wrapper) {
  return (
    <section
      className={classNames(
        'relative flex flex-col flex-1 h-full gap-10 max-w-7xl sm:gap-10 px-4 sm:px-6 lg:px-8 mt-10 lg:mt-auto overflow-hidden overflow-x-auto',
        props?.class
      )}
    >
      {props.children}
    </section>
  );
}

export function SectionWrapper(props: Wrapper) {
  return (
    <section
      className={classNames(
        'flex flex-col gap-10',
        props.hidden && 'hidden',
        props?.class
      )}
    >
      {props.children}
    </section>
  );
}
