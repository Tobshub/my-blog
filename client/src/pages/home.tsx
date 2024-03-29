import PageNavBar from "../components/ui/navbar";
import CodingPersonSVG from "../assets/images/coding-person.webp";
import CodingPersonWLaptopSVG from "../assets/images/man&laptop.webp";
import ContactMan from "../assets/images/contact-man.png";
import "../assets/styles/home.scss";
import HScrollableContainer from "../components/ui/scrollable-container";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiExpress,
  SiMongodb,
  SiPrisma,
  SiGithub,
  SiTwitter,
  SiLinkedin,
} from "react-icons/si";
import { FaCss3, FaHtml5, FaNodeJs } from "react-icons/fa";
import { DiGit, DiSass } from "react-icons/di";
import { MdAlternateEmail } from "react-icons/md";
import { IconContext } from "react-icons";
import Page from "../layouts/Page";

export default function HomePage() {
  return (
    <Page mainClassName="d-flex" mainStyles={{ gap: "4rem", maxWidth: 1200, margin:  "0 auto" }}>
      <style>{`
        a {
          color: inherit;
        }
      `}</style>
      <div className="d-flex invert-on-break">
        <div id="top" style={{ scrollMarginTop: "4rem" }}>
          <h1 className="display-2" style={{ fontWeight: 600 }}>
            Hey!
          </h1>
          <p className="h4">You can call me Tobs :)</p>
          <p className="fs-6">Fullstack Web Developer || Twitch Chat Member</p>
        </div>
        <img
          className="large-image"
          src={CodingPersonSVG}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            maxWidth: 525
          }}
        />
      </div>
      <div className="d-flex" style={{ textAlign: "right" }}>
        <img
          src={CodingPersonWLaptopSVG}
          className="large-image"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div className="d-flex px-3 flex-column align-items-end">
          <h1 id="about" style={{ scrollMarginTop: "5rem" }}>
            About
          </h1>
          <p style={{ fontWeight: 500, maxWidth: 550 }}>
            My name is Tobani Esan-George (AKA Tobs). I love{" "}
            <a href="https://lichess.org/@/Tobani" title="send me a challenge">
              chess
            </a>
            , photography, and anime. And most importantly...{" "}
            <strong>I love to code</strong> - or watch others code on twitch :).
            <br />
            I've been programming almost everyday since I officially started in
            June 2022. And almost everyday I've been in love with it.
          </p>
          <div
            style={{ textAlign: "center", maxWidth: "100%" }}
            className="d-flex flex-column gap-2 align-items-center"
          >
            <span className="d-block">My Tech Stack:</span>
            <HScrollableContainer>
              <IconContext.Provider
                value={{
                  size: "2.75rem",
                  className: "react-icons",
                  style: { color: "var(--palette-text)" },
                }}
              >
                <li title="html">
                  <FaHtml5 />
                </li>
                <li title="css">
                  <FaCss3 />
                </li>
                <li title="sass">
                  <DiSass />
                </li>
                <li title="javascript">
                  <SiJavascript />
                </li>
                <li title="typescript">
                  <SiTypescript />
                </li>
                <li title="reactjs">
                  <SiReact />
                </li>
                <li title="nodejs">
                  <FaNodeJs />
                </li>
                <li title="expressjs">
                  <SiExpress />
                </li>
                <li title="git">
                  <DiGit />
                </li>
                <li title="mongodb">
                  <SiMongodb />
                </li>
                <li title="prisma">
                  <SiPrisma />
                </li>
              </IconContext.Provider>
            </HScrollableContainer>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div>
          <h1 id="contact-me" style={{ scrollMarginTop: "5rem" }}>
            Contact Me
          </h1>
          <div style={{ fontWeight: 500, maxWidth: 525, fontSize: "1.25rem" }}>
            <IconContext.Provider
              value={{
                className: "react-icons",
                size: "3rem",
                style: {
                  color: "var(--palette-text)",
                  marginRight: "1.5rem",
                },
              }}
            >
              <p>
                <span title="email">
                  <MdAlternateEmail />
                </span>
                <a href="mailto:tobanigeorge@gmail.com">
                  tobanigeorge@gmail.com
                </a>
              </p>
              <p>
                <span>
                  <SiGithub />
                </span>
                <a href="https://github.com/Tobshub" target="_blank">
                  Tobshub
                </a>
              </p>
              <p>
                <span>
                  <SiTwitter />
                </span>
                <a href="https://twitter.com/tobani_io" target="_blank">
                  tobani_io
                </a>
              </p>
              <p>
                <span>
                  <SiLinkedin />
                </span>
                <a
                  href="https://www.linkedin.com/in/tobani-esan-george/"
                  target="_blank"
                >
                  Tobani Esan-George
                </a>
              </p>
            </IconContext.Provider>
          </div>
        </div>
        <img src={ContactMan} className="large-image" />
      </div>
    </Page>
  );
}
