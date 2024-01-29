import Links from "../Links";
import ReactSwitch from "react-switch";

export default function Header({ toggle, theme }) {
  return (
    <>
      <header className="header">
        <div className="switch">
          <label htmlFor='switch' className="theme">
            {theme === "light" ? "Light Mode" : "Dark Mode"}
            <ReactSwitch id='switch' onChange={toggle} checked={theme === "dark"} uncheckedIcon={false} checkedIcon={false} height={20} handleDiameter={20} width={50} onColor={'#D703D4'} offColor={'#A490A4'}/>
          </label>
        </div>

        <div className="background"></div>
        <h1>Slumbernaut</h1>

        <p className="tag-line">Circadian Rhythms and Spaced Out Sounds</p>

        <Links />
      </header>
    </>
  );
}
