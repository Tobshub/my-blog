import { useRouteError } from "react-router-dom";

export default function RenderBlogErrorElement() {
  const error = useRouteError() as {};
  console.log(error);

  return <>An error occured</>;
}
