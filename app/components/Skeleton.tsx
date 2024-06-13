import Wrapper from '@components/Wrapper';

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

export function TableSkeleton() {
  return (
    <section className="flex flex-1 justify-center">
      <div className="flex flex-col gap-4 w-full max-w-6xl">
        <div className="skeleton h-4 w-48"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-[80px] w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </section>
  );
}

export function StatsCardSkeleton() {
  return (
    <section className="flex flex-1 justify-center">
      <div className="flex flex-col gap-3 w-full max-w-6xl">
        <div className="skeleton h-[70px] w-full"></div>
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

export function Spinner(props: { wrapper?: boolean }): React.ReactElement {
  if (props.wrapper) {
    return (
      <Wrapper>
        <span className="loading loading-ring loading-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </Wrapper>
    );
  }

  return (
    <span className="loading z-10 loading-ring loading-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
  );
}
