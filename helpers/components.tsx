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
