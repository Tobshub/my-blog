import PageNavBar from "../components/ui/navbar";

type PageProps = React.PropsWithChildren & {
  pageStyles: React.CSSProperties | undefined;
  mainStyles: React.CSSProperties | undefined;
  mainClassNames: string[];
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
        className={props.mainClassNames.join(" ")}
      >
        {props.children}
      </main>
    </div>
  );
}
