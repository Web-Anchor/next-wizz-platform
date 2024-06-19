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
      <span className="truncate">{props.title}</span>
      <span className="text-md truncate bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent">
        {props.message}
      </span>
    </section>
  );
}
