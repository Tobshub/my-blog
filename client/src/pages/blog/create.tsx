import PageNavBar from "../../components/ui/navbar";
import { LoaderFunctionArgs, redirect, useNavigate } from "react-router-dom";
import { getToken } from "../../lib/store";
import React, { useRef, useState } from "react";
import trpc from "../../utils/trpc";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Page from "../../layouts/Page";

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
      tags: string[];
    }) ?? { title: "", body: "", tags: [] }
  );
  const editorRef = useRef<ReactQuill>(null);

  const handleEditorChange = (value: string) => {
    setContent((state) => ({ ...state, body: value }));
    // save change in localstorage
    localStorage.setItem(
      "saved-post",
      JSON.stringify({ ...content, body: value })
    );
  };

  const handleTitleChange = (title: string) => {
    setContent((state) => ({ ...state, title }));
    // save change in localstorage
    localStorage.setItem("saved-post", JSON.stringify({ ...content, title }));
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(", ").map((tag) => tag.trim());
    setContent((state) => ({ ...state, tags }));
    // save change in localstorage
    localStorage.setItem("saved-post", JSON.stringify({ ...content, tags }));
  };

  const navigate = useNavigate();
  const createMut = trpc.posts.newPost.useMutation({
    onSuccess(data) {
      localStorage.removeItem("saved-post");
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
    if (content.title && content.body && editorRef.current) {
      // use plain text as the description
      const description = editorRef.current
        .getEditor()
        .getText()
        .slice(0, 250)
        .concat("...");
      createMut.mutate({
        ...content,
        description,
      });
    }
  };

  return (
    <Page>
      <TitleWithState title={content.title} setTitle={handleTitleChange} />
      <TagsWithState tags={content.tags} setTags={handleTagsChange} />
      <div className="mb-5" style={{ height: "fit-content" }}>
        <ReactQuill
          ref={editorRef}
          value={content.body}
          onChange={handleEditorChange}
          placeholder="Post content..."
          style={{ height: 400 }}
        />
      </div>
      <div className="d-flex gap-4 justify-content-end">
        <button className="btn btn-outline-secondary px-4 py-2">CANCEL</button>
        <button className="btn btn-success px-4 py-2" onClick={handleCreate}>
          POST
        </button>
      </div>
    </Page>
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

function TagsWithState(props: {
  tags: string[];
  setTags(value: string): void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setTags(e.target.value);
  };

  return (
    <input
      value={props.tags.join(", ")}
      onChange={handleChange}
      className="px-2 py-1 mb-2"
      style={{ fontSize: ".8rem", width: 200, borderRadius: 5 }}
    />
  );
}
