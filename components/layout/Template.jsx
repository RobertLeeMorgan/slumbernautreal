"use client";

import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";
import { useEffect, useState } from "react";

export default function Layout(props) {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  function toggleTheme() {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }
  return (
    <div className={theme}>
      <Header toggle={toggleTheme} theme={theme} />
      <Nav />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
