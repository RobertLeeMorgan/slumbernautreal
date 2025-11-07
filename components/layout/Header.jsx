import Links from "../Links";
import ReactSwitch from "react-switch";

export default function Header({ toggle, theme }) {
  return (
    <>
      <header className="header">
        <div className="switch">
          <label htmlFor="switch" className="theme">
            {theme === "light" ? "Light Mode" : "Dark Mode"}
            <ReactSwitch
              id="switch"
              onChange={toggle}
              checked={theme === "dark"}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              handleDiameter={20}
              width={50}
              onColor={"#D703D4"}
              offColor={"#A490A4"}
            />
          </label>
        </div>

        <div className="background"></div>
        <h1>
          {" "}
          {process.env.ARTIST_NAME
            ? process.env.ARTIST_NAME.charAt(0).toUpperCase() +
              process.env.ARTIST_NAME.slice(1)
            : ""}
        </h1>

        <p className="tag-line">{process.env.NEXT_PUBLIC_ARTIST_TAGLINE}</p>

        <Links />
      </header>
    </>
  );
}
