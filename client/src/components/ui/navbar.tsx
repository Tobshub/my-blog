import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export default function PageNavBar() {
  // grab the root div
  const root = document.getElementById("root");
  const [darken, setDarken] = useState(false);
  // if the navbar isnt at the initial position, darken the background-slightly
  const darkenOnScroll = (e: Event) => {
    if (root) {
      const y = root.scrollTop;
      if (y > 100) {
        setDarken(true);
      } else {
        setDarken(false);
      }
    }
  };

  useEffect(() => {
    if (root) {
      root.onscroll = darkenOnScroll;
    }

    return () => {
      if (root) {
        root.onscroll = null;
      }
    };
  }, []);

  return (
    <header
      className={`d-flex w-100 align-items-center justify-content-around`}
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "100dvw",
        backgroundColor: darken ? "var(--palette-background)" : "transparent",
        transition: "background-color 350ms",
      }}
    >
      <style>{`
        strong {color: var(--palette-cyan)}
      `}</style>
      <h1 className="display-5">
        <strong>{"<"}</strong>
        <em> tobs_** </em>
        <strong>{"/>"}</strong>
      </h1>
      <nav className="nav navbar navbar-expand-lg">
        <ul className="navbar-nav flex-row  gap-4 fs-4 font-weight-bold">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/#about">About</NavItem>
          <NavItem to="/blog">Blog</NavItem>
          <NavItem to="/#contact-me">Contact Me</NavItem>
        </ul>
      </nav>
    </header>
  );
}

function NavItem(props: PropsWithChildren & { to: string }) {
  return (
    <li className="nav-item text-reset px-4 header__nav-item">
      <style>{`
        li.nav-item {
          border-radius: 5px;
          border: 1px solid transparent;
        }
        li.nav-item:hover {
          border-image: linear-gradient(var(--palette-pink), var(--palette-cyan)) 15;
        }
      `}</style>
      <NavLink
        to={props.to}
        className={({ isActive }) =>
          `nav-link text-reset ${isActive ? "active" : ""}`
        }
      >
        {props.children}
      </NavLink>
    </li>
  );
}
