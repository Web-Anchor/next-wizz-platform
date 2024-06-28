import Wrapper from '@components/Wrapper';
import { classNames } from '@helpers/index';
import { DocumentChartBarIcon } from '@heroicons/react/24/outline';

export function NoDataSkeleton() {
  return (
    <section className="flex flex-1 h-full justify-center">
      <section className="flex flex-col gap-5 my-auto bg-indigo-400 rounded-3xl p-5 items-center justify-center">
        <DocumentChartBarIcon className="h-12 w-12 text-white" />
        <p className="text-white">No data available</p>
      </section>
    </section>
  );
}

export function CardSkeleton() {
  return (
    <section className="flex flex-1 justify-center">
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </section>
  );
}

export function UserCardSkeleton() {
  return (
    <section className="flex flex-1 justify-center">
      <div className="flex flex-col gap-4 w-[640px]">
        <div className="skeleton h-[400px] w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </section>
  );
}

export function TableSkeleton(props: { cardClass?: string }) {
  return (
    <section className="flex flex-1 justify-center">
      <div className="flex flex-col gap-4 w-full max-w-6xl">
        <div className="skeleton h-4 w-48"></div>
        <div className="skeleton h-4 w-full"></div>
        <div
          className={classNames('skeleton h-[80px] w-full', props.cardClass)}
        ></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </section>
  );
}

export function StatsCardSkeleton() {
  return (
    <section className="flex flex-1 justify-center min-w-[240px]">
      <div className="flex flex-col gap-3 w-full max-w-6xl">
        <div className="skeleton h-[95px] w-full"></div>
        <div className="skeleton h-3 w-28"></div>
        <div className="skeleton h-3 w-full"></div>
      </div>
    </section>
  );
}

export function RowSkeleton() {
  return (
    <section className="flex flex-1 justify-center">
      <div className="flex flex-col gap-4 w-full">
        <div className="skeleton h-4 w-full"></div>
      </div>
    </section>
  );
}

export function PieSkeleton() {
  return (
    <section className="flex justify-center rounded-full skeleton h-full w-full" />
  );
}

export function Spinner(props: {
  wrapper?: boolean;
  hidden?: boolean;
}): React.ReactElement {
  const spinnerClass =
    'loading loading-ring loading-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';

  if (props.wrapper) {
    return (
      <Wrapper class={props?.hidden ? 'hidden' : undefined}>
        <span className={classNames(spinnerClass, props?.hidden && 'hidden')} />
      </Wrapper>
    );
  }

  return (
    <span className={classNames(spinnerClass, props?.hidden && 'hidden')} />
  );
}
