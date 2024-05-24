import { classNames } from '@helpers/index';

type Wrapper = { children?: React.ReactNode; class?: string };

export default function Wrapper(props: Wrapper) {
  return (
    <section
      className={classNames(
        'flex flex-col flex-1 gap-4 max-w-7xl sm:gap-10 px-4 sm:px-6 lg:px-8 mt-10 lg:mt-auto',
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
      className={classNames('flex flex-1 flex-col gap-10', props?.class)}
    >
      {props.children}
    </section>
  );
}
