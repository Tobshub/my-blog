import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Form, NavLink, useNavigate } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import "../../assets/styles/navbar.scss";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose, MdOutlineSearch, MdCancel } from "react-icons/md";
import debounce from "../../utils/debounce";

export default function PageNavBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mode, setMode] = useState<"normal" | "search">("normal");
  const searchInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // if the window is resized reopen the nav-bar
  // use debounce function to reduce the number of re-renders
  const openOnResize = debounce(() => {
    if (windowWidth === window.innerWidth) {
      return;
    }
    if (window.innerWidth > 800) {
      setIsOpen(true);
    }
    setWindowWidth(window.innerWidth);
  }, 10);

  useEffect(() => {
    window.addEventListener("resize", openOnResize);
    return () => window.removeEventListener("resize", openOnResize);
  }, []);

  return (
    <>
      <IconContext.Provider
        value={{
          className: "react-icons",
          style: { color: "var(--palette-text)" },
          size: "2rem",
        }}
      >
        <div className="open-nav">
          <GiHamburgerMenu onClick={() => setIsOpen(true)} />
        </div>
        <header
          style={{
            transition: "background-color 350ms",
            width: isOpen ? "" : "0",
          }}
        >
          <div className="close-nav">
            <MdOutlineClose onClick={() => setIsOpen(false)} />
          </div>
          <style>{`
        header strong {color: var(--palette-cyan)}
      `}</style>
          <h1 className="display-5">
            <strong>{"<"}</strong>
            <em> tobs_** </em>
            <strong>{"/>"}</strong>
          </h1>
          <nav className="nav navbar">
            {mode === "normal" ? (
              <NormalNavBar setMode={setMode} />
            ) : (
              <form
                className="form-inline d-flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchInput.current) {
                    navigate(`/blog?title=${searchInput.current?.value}`);
                  }
                }}
              >
                <input
                  ref={searchInput}
                  type="search"
                  placeholder="search by title"
                  className="form-control px-3 py-0"
                />
                <button
                  type="button"
                  className="btn"
                  onClick={() => setMode("normal")}
                >
                  <MdCancel />
                </button>
                <button type="submit" className="btn">
                  Search
                </button>
              </form>
            )}
          </nav>
        </header>
      </IconContext.Provider>
    </>
  );
}

function NormalNavBar({
  setMode,
}: {
  setMode: React.Dispatch<React.SetStateAction<"normal" | "search">>;
}) {
  return (
    <>
      <ul className="navbar-nav gap-4 fs-4 font-weight-bold mx-2">
        <NavItem to="/#top">Home</NavItem>
        <NavItem to="/#about">About</NavItem>
        <NavItem to="/blog">Blog</NavItem>
        <NavItem to="/#contact-me">Contact Me</NavItem>
      </ul>
      <div className="mx-2">
        <MdOutlineSearch onClick={() => setMode("search")} />
      </div>
    </>
  );
}

function NavItem(props: PropsWithChildren & { to: string }) {
  return (
    <li className="nav-item text-reset header__nav-item">
      <style>{`
        li.nav-item {
          border-radius: 5px;
          border: 1px solid transparent;
        }
        li.nav-item:hover {
          border-image: linear-gradient(var(--palette-pink), var(--palette-cyan)) 15;
        }
      `}</style>
      {props.to.includes("#") ? (
        <NavHashLink
          smooth={true}
          to={props.to}
          className={({ isActive }) =>
            `nav-link text-reset px-3 ${isActive ? "active" : ""}`
          }
        >
          {props.children}
        </NavHashLink>
      ) : (
        <NavLink
          to={props.to}
          className={({ isActive }) =>
            `nav-link text-reset px-3 ${isActive ? "active" : ""}`
          }
        >
          {props.children}
        </NavLink>
      )}
    </li>
  );
}
