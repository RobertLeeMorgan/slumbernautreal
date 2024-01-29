"use client";

import Records from "../components/Records";
import Videos from "../components/Videos";
import { useState, useEffect } from "react";
import { Audio } from "react-loader-spinner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [youtubeIds, setYoutubeIds] = useState([]);
  const [releases, setReleases] = useState([
    { tag: "", title: "", date: "", image: "", link: "" },
  ]);
  

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
        console.log(e.name)
        records.push({
          tag: e.album_group,
          title: e.name,
          date: e.release_date,
          image: e.images[1],
          link:
            Date(e.release_date) < Date("1/1/2021")
              ? `https://hypeddit.com/slumbernaut/${e.name.replace(/\s/g, "")}`
              : e.name === 'Taste of Spring (Edit)' ? 'https://distrokid.com/hyperfollow/slumbernaut/taste-of-spring-edit' : `https://distrokid.com/hyperfollow/slumbernaut/${e.name.replace(
                  /\s/g,
                  ""
                )}`,
        });
      });
      records.sort((a, b) => new Date(b.date) - new Date(a.date));
      records[0].tag = "New " + records[0].tag;
      setReleases(() => records);
    };

    fetchReleases().catch(console.error);
  }, []);


  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=id&part=snippet&playlistId=PLkXmbLiHyeLD4FrejYf5MJ3jTKCa3gl4V&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
        { cache: "force-cache" }
      );
      const data = await res.json();
      const youtubeId = [];
      data.items.forEach((e) => {
        youtubeId.push({
          id: e.snippet.resourceId.videoId,
          title: e.snippet.title,
        });
      });
      setYoutubeIds(() => youtubeId);
    };
    fetchVideos().catch(console.error);
    setIsLoading(() => false);
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
    <>
      <Records releases={releases} />
      <Videos ids={youtubeIds} />
    </>
  );
}
