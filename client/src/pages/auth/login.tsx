import trpc from "../../utils/trpc";
import * as store from "../../lib/store";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMut = trpc.auth.login.useMutation({
    onSuccess(token) {
      store.setToken(token);
      navigate("/post/create");
    },
    onError(e) {
      // parese the error and display the error message
      const error = JSON.parse(JSON.stringify(e.message));
      switch (typeof error) {
        case "string": {
          setErrorMsg(error);
          break;
        }
        case "object": {
          if (Array.isArray(error)) {
            setErrorMsg(error[0].message);
          }
        }
      }
    },
  });

  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFormValues((state) => ({ ...state, [name]: e.target.value }));
    setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMut.mutate({ ...formValues });
  };

  return (
    <div
      className={`
      page
      d-flex 
      justify-content-center 
      align-items-center
    `}
    >
      <form
        onSubmit={handleSubmit}
        className={`
          d-flex
          flex-column
          align-items-center
      `}
        style={{
          width: "min(90%, 400px)",
        }}
      >
        <h1 className="display-4">Log In</h1>
        {errorMsg ? (
          <p style={{ color: "red", textShadow: "0 0 0" }}>{errorMsg}</p>
        ) : null}
        <div className="mb-3 w-100">
          <label className="form-label">Email:</label>
          <input
            className="form-control"
            type="email"
            onChange={(e) => handleChange(e, "email")}
          />
        </div>
        <div className="mb-3 w-100">
          <label className="form-label">Password:</label>
          <input
            className="form-control"
            type="password"
            onChange={(e) => handleChange(e, "password")}
          />
        </div>
        <div className="d-flex w-100 justify-content-between align-items-center">
          <Link
            to="/"
            className="btn btn-outline-secondary px-4 py-2"
            style={{ fontWeight: 500 }}
          >
            Back
          </Link>
          <button
            type="submit"
            className="btn btn-outline-primary px-4 py-2"
            style={{ fontWeight: 500 }}
            disabled={loginMut.isLoading || !!errorMsg}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
