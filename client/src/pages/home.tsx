import PageNavBar from "../components/ui/navbar";
import CodingPersonSVG from "../assets/images/coding-person.webp";
import CodingPersonWLaptopSVG from "../assets/images/man&laptop.webp";
import BackgroundSVG from "../assets/images/background.svg";
import ContactMan from "../assets/images/contact-man.png";

export default function HomePage() {
  return (
    <div
      className={`page `}
      style={{ backgroundImage: `url(${BackgroundSVG})` }}
    >
      <style>{`
        a {
          color: inherit;
        }
        img.large-image {
          width: 50%;
        }
        @media (max-width: 750px) {
          * {
            flex-direction: column;
            text-align: center
          }
          img.large-image {
            width: 100%;
          }
        }
        
      `}</style>
      <PageNavBar />
      <main
        className={`d-flex flex-column align-items-center`}
        style={{ gap: "4rem" }}
      >
        <div className="w-100 d-flex justify-content-around align-items-center">
          <div id="top" style={{ scrollMarginTop: "4rem" }}>
            <h1 className="display-2" style={{ fontWeight: 600 }}>
              Hey!
            </h1>
            <p className="h4">You can call me Tobs :)</p>
            <p className="fs-6">
              Fullstack Web Developer || Twitch Chat Member
            </p>
          </div>
          <img
            className="large-image"
            src={CodingPersonSVG}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        <div
          className="w-100 d-flex justify-content-between align-items-center"
          style={{ textAlign: "right" }}
        >
          <img
            src={CodingPersonWLaptopSVG}
            className="large-image"
            style={{
              width: "fit-content",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
          <div>
            <h1 id="about" style={{ scrollMarginTop: "5rem" }}>
              About
            </h1>
            <p style={{ fontWeight: 500, maxWidth: 525, float: "right" }}>
              My name is Tobani Esan-George (AKA Tobs). I love{" "}
              <a
                href="https://lichess.org/@/Tobani"
                title="send me a challenge"
              >
                chess
              </a>
              , photography, and anime. And most importantly...{" "}
              <strong>I love to code</strong> - or watch others code on twitch
              :).
              <br />
              I've been programming almost everyday since I officially started
              in June 2022. And almost everyday I've been in love with it.
            </p>
            <ul style={{ textAlign: "left" }}>
              My Tech Stack:
              <li>HTML/CSS</li>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>NodeJS</li>
              <li>ExpressJS</li>
            </ul>
          </div>
        </div>
        <div className="w-100 d-flex align-items-center justify-content-between">
          <div>
            <h1 id="contact-me" style={{ scrollMarginTop: "5rem" }}>
              Contact Me
            </h1>
            <p style={{ fontWeight: 500, maxWidth: 525 }}>
              Email:{" "}
              <a href="mailto:tobanigeorge@gmail.com">tobanigeorge@gmail.com</a>
              <br />
              Github:{" "}
              <a href="https://github.com/Tobshub" target="_blank">
                Tobshub
              </a>
              <br />
              Twitter:{" "}
              <a href="https://twitter.com/tobani_io" target="_blank">
                tobani_io
              </a>
              <br />
              LinkedIn:{" "}
              <a href="https://linkedin.com/tobani-esan-george" target="_blank">
                Tobani Esan-George
              </a>
            </p>
          </div>
          <img src={ContactMan} className="large-image" />
        </div>
      </main>
    </div>
  );
}
