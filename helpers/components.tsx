export function mediaScreenTitle(
  large: string | number | React.ReactNode,
  small?: string | number | React.ReactNode
) {
  return (
    <section>
      <section className="truncate flex sm:hidden">{small ?? large}</section>
      <section className="truncate hidden sm:flex">{large}</section>
    </section>
  );
}

export function limitedTime(props: { title: string; message?: string }) {
  return (
    <section className="flex flex-row gap-2">
      <section className="truncate">{props.title}</section>
      <section className="text-md truncate bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent">
        {props.message}
      </section>
    </section>
  );
}
