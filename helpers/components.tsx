export function mediaScreenTitle(
  large: string | number | React.ReactNode,
  small?: string | number | React.ReactNode
) {
  return (
    <section>
      <p className="truncate flex md:hidden ">{small ?? large}</p>
      <p className="truncate hidden md:flex">{large}</p>
    </section>
  );
}

export function limitedTime(props: { title: string; message?: string }) {
  return (
    <section className="flex flex-row gap-2">
      <p className="truncate">{props.title}</p>
      <p className="text-md truncate text-indigo-600">{props.message}</p>
    </section>
  );
}
