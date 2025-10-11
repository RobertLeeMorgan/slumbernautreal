"use client";

import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";
import { useEffect, useState } from "react";

function useTheme() {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDarkMode ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return [theme, toggleTheme];
}

export default function Layout(props) {
  const [theme, toggleTheme] = useTheme("");
  
  return (
    <div className={theme}>
      <Header toggle={toggleTheme} theme={theme} />
      <Nav />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
