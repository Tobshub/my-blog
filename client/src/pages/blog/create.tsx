import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import PageNavBar from "../../components/ui/navbar";
import { LoaderFunctionArgs, redirect, useNavigate } from "react-router-dom";
import { getToken } from "../../lib/store";
import React, { useRef, useState } from "react";
import trpc from "../../utils/trpc";
import MDToHTML from "../../lib/md-html";

export async function loader({}: LoaderFunctionArgs) {
  const token = getToken();
  if (!token) {
    // TODO: redirect to not found page
    return redirect("/secret/login");
  }
  return null;
}

export default function CreatePost() {
  const [content, setContent] = useState(
    // get stored post content, if any
    (JSON.parse(localStorage.getItem("saved-post") as string) as {
      title: string;
      body: string;
    }) ?? { title: "", body: "" }
  );

  const handleEditorChange = (value: string) => {
    setContent((state) => ({ ...state, body: value }));
    // save change in localstorage
    localStorage.setItem(
      "saved-post",
      JSON.stringify({ ...content, body: value })
    );
  };

  const handleTitleChange = (value: string) => {
    setContent((state) => ({ ...state, title: value }));
    // save change in localstorage
    localStorage.setItem(
      "saved-post",
      JSON.stringify({ ...content, title: value })
    );
  };

  const navigate = useNavigate();
  const createMut = trpc.posts.newPost.useMutation({
    onSuccess(data) {
      console.log(data);
      const { slug } = data;
      return navigate(`/blog/${slug}`);
    },
    onError(e) {
      console.error(e);
    },
  });

  const handleCreate = async () => {
    const sure = window.confirm(
      `Are you sure you want to create new post: ${content.title}`
    );
    if (!sure) return;
    const body = MDToHTML(content.body);
    if (body && content.title) {
      createMut.mutate({
        body,
        title: content.title,
        description: "A test post",
        tags: ["test", "delete"],
      });
    }
  };

  return (
    <div className="page">
      <PageNavBar />
      <main>
        <TitleWithState title={content.title} setTitle={handleTitleChange} />
        <div
          style={{ backgroundColor: "var(--palette-white)" }}
          className="mb-4"
        >
          <SimpleMdeReact value={content.body} onChange={handleEditorChange} />
        </div>
        <div className="d-flex gap-4 justify-content-end">
          <button className="btn btn-outline-secondary px-4 py-2">
            CANCEL
          </button>
          <button className="btn btn-success px-4 py-2" onClick={handleCreate}>
            POST
          </button>
        </div>
      </main>
    </div>
  );
}

function TitleWithState(props: {
  title: string;
  setTitle(title: string): void;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (isEditMode) {
    return (
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          ref={inputRef}
          defaultValue={props.title}
          className="px-2 py-1"
          style={{ fontSize: "1.5rem", width: 350, borderRadius: 5 }}
        />
        <div className="d-flex gap-3">
          <button
            className="btn btn-sm btn-outline-primary px-4 py-2"
            onClick={() => {
              props.setTitle(inputRef.current?.value.trim() ?? "");
              setIsEditMode(false);
            }}
          >
            Save
          </button>
          <button
            className="btn btn-sm btn-outline-secondary px-4 py-2"
            onClick={() => setIsEditMode(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-between align-items-center">
      <h1>{props.title ? props.title : "Untitled"}</h1>
      <button
        className="btn btn-sm btn-outline-primary px-4 py-2"
        onClick={() => setIsEditMode(true)}
      >
        Edit
      </button>
    </div>
  );
}
