import PageNavBar from "../components/ui/navbar";

type PageProps = React.PropsWithChildren & {
  pageStyles?: React.CSSProperties;
  mainStyles?: React.CSSProperties;
  mainClassName?: string;
};

export default function Page(props: PageProps) {
  return (
    <div
      className="page"
      style={props.pageStyles ? props.pageStyles : undefined}
    >
      <PageNavBar />
      <main
        style={props.mainStyles ? props.mainStyles : undefined}
        className={props.mainClassName ?? ""}
      >
        {props.children}
      </main>
    </div>
  );
}
