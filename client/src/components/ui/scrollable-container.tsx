export default function HScrollableContainer(props: React.PropsWithChildren) {
  return <ul className="h-scrollable-container">{props.children}</ul>;
}
