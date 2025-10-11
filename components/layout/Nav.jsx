"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [scroll, setScroll] = useState(false);
  const nav = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (!nav.current) return;
      const rect = nav.current.
      getBoundingClientRect();
      setScroll(rect.top <= 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
            className={pathname.startsWith("/about") ? "active" : "inactive"}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/shows"
            className={pathname.startsWith("/shows") ? "active" : "inactive"}
          >
            Shows
          </Link>
        </li>
        <li>
          <Link
            href="/merch"
            className={pathname.startsWith("/merch") ? "active" : "inactive"}
          >
            Merch
          </Link>
        </li>
      </ul>
    </nav>
  );
}
