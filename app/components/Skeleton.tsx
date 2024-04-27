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
      <div className="flex flex-col gap-4 w-[640px]">
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
