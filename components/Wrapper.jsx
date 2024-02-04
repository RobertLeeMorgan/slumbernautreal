'use client'

import { useRef, useState } from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import Button from "./Button";

export default function Wrapper({ line, title, children }) {
  const scroll = useRef();
  const [edge, setEdge] = useState({
    left: true,
    right: false,
  });

  const scrollLeft = () => {
    scroll.current.scrollLeft -= 310;
    setEdge((prev) => ({ ...prev, right: false }));
    if (scroll.current.scrollLeft <= 500) {
      setEdge((prev) => ({ ...prev, left: true }));
    }
  };

  const scrollRight = () => {
    scroll.current.scrollLeft += 310;
    setEdge((prev) => ({ ...prev, left: false }));
    if (
      scroll.current.scrollLeft >
      scroll.current.scrollWidth - scroll.current.clientWidth - 400
    ) {
      scroll.current.scrollLeft = scroll.current.scrollWidth;
      setEdge((prev) => ({ ...prev, right: true }));
    }
  };

  const handleTouchStart = () => {
    setEdge((prev) => ({ ...prev, left: true, right: true }));
  };

  return (
    <section>
      <h3>{title}</h3>
      <div className="wrapper">
        <div className="container">
          {!edge.left && (
            <Button title={<MdSkipPrevious />} scroll={scrollLeft} />
          )}
          <ul
            className="scroller snaps-inline"
            onTouchStart={handleTouchStart}
            ref={scroll}
          >
            {children}
          </ul>
          {!edge.right && (
            <Button title={<MdSkipNext />} scroll={scrollRight} />
          )}
        </div>
      </div>
      {line && <hr className="break" />}
    </section>
  );
}
