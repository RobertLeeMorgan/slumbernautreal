"use client";

import { useState, useEffect } from "react";
import Vinyl from "./Vinyl";
import { Audio } from "react-loader-spinner";

export default function Vinyls() {
  const [releases, setReleases] = useState([
    { tag: "", title: "", date: "", image: "", link: "", id: "" },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReleases = async () => {
      const token = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
      });
      const response = await token.json();
      const API_TOKEN = response.access_token;
      const res = await fetch(
        "https://api.spotify.com/v1/artists/4Z4SX46wN0h6BL8geY82nt/albums?include_groups=single%2Calbum",
        {
          cache: "force-cache",
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        }
      );
      const data = await res.json();
      const records = [];
      data.items.forEach((e) => {
        records.push({
          id: e.id,
          name: `${e.name} ${e.album_group === "single" ? "EP" : "LP"}`,
          price: e.album_group === "single" ? 12.99 : 21.99,
          description: `${e.name} ${
            e.album_group === "single" ? '7" Vinyl' : '12" Vinyl'
          }`,
          image: e.images[1].url,
          date: e.release_date,
        });
      });
      records.sort((a, b) => new Date(b.date) - new Date(a.date));
      setReleases(() => records);
    };
    fetchReleases().catch(console.error);
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
    <ul id="vinyls">
      {releases.map((e) => (
        <Vinyl key={e.id} vinyl={e} />
      ))}
    </ul>
  );
}
