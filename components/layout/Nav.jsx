"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [scroll, setScroll] = useState(false);
  const nav = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const rect = nav.current.getBoundingClientRect();
      setScroll(rect.top <= 0);
    });
  }, []);

  return (
    <nav className={scroll ? "stuck" : ""} ref={nav}>
      <ul className="navbar">
        <li>
          <Link href="/" className={pathname === "/" ? "active" : "inactive"}>
            Music
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={pathname === "/about" ? "active" : "inactive"}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/shows"
            className={pathname === "/shows" ? "active" : "inactive"}
          >
            Shows
          </Link>
        </li>
        <li>
          <Link
            href="/merch"
            className={pathname === "/merch" ? "active" : "inactive"}
          >
            Merch
          </Link>
        </li>
      </ul>
    </nav>
  );
}
