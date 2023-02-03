import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import "../../assets/styles/navbar.scss";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import debounce from "../../utils/debounce";

export default function PageNavBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // if the window is resized reopen the nav-bar
  window.addEventListener(
    "resize",
    // use debounce function to reduce the number of re-renders
    debounce(() => {
      if (windowWidth === window.innerWidth) {
        return;
      }
      if (!isOpen) {
        setIsOpen(true);
      }
      setWindowWidth(window.innerWidth);
    }, 200)
  );

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
          <nav className="nav navbar navbar-expand-lg">
            <ul className="navbar-nav gap-4 fs-4 font-weight-bold">
              <NavItem to="/#top">Home</NavItem>
              <NavItem to="/#about">About</NavItem>
              <NavItem to="/blog">Blog</NavItem>
              <NavItem to="/#contact-me">Contact Me</NavItem>
            </ul>
          </nav>
        </header>
      </IconContext.Provider>
    </>
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
      {props.to.includes("#") ? (
        <NavHashLink
          smooth={true}
          to={props.to}
          activeClassName={"active"}
          className={`nav-link text-reset`}
        >
          {props.children}
        </NavHashLink>
      ) : (
        <NavLink
          to={props.to}
          className={({ isActive }) =>
            `nav-link text-reset ${isActive ? "active" : ""}`
          }
        >
          {props.children}
        </NavLink>
      )}
    </li>
  );
}
