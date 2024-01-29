"use client";

import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";

export default function About() {
  const [desc, setDesc] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const desc = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${process.env.NEXT_PUBLIC_CHANNEL_ID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
        { cache: "force-cache" }
      );
      const results = await desc.json();
      const description = results.items[0].snippet.description;
      const ps = description.split(/\r?\n|\r|\n/g);
      const evens = ps.filter(function(v, i) {
        return i % 2 == 0;
      });
      setDesc(() => evens);
    };
    fetchData().catch(console.error);
    setIsLoading(() => false)
  }, []);
  
  if (isLoading) {
    return (
      <div className="loader">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="purple"
          ariaLabel="loading"
          wrapperStyle
        />
      </div>
    );
  }

  return (
    <section className="about">
      {desc.map((e) => (
        <p key={Math.floor(Math.random() * 100)}>{e}</p>
      ))}
    </section>
  );
}
