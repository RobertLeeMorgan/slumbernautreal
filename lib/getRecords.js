'use server'

import { cache } from "react";

export const getRecords = cache(async () => {
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
      title: e.name,
      name: `${e.name} ${e.album_group === "single" ? "EP" : "LP"}`,
      price: e.album_group === "single" ? 12.99 : 21.99,
      description: `${e.name} ${
        e.album_group === "single" ? '7" Vinyl' : '12" Vinyl'
      }`,
      image: e.images[1].url,
      date: e.release_date,
      tag: e.album_group,
      link:
        Date(e.release_date) < Date("1/1/2021")
          ? `https://hypeddit.com/slumbernaut/${e.name.replace(/\s/g, "")}`
          : e.name === "Taste of Spring (Edit)"
          ? "https://distrokid.com/hyperfollow/slumbernaut/taste-of-spring-edit"
          : `https://distrokid.com/hyperfollow/slumbernaut/${e.name.replace(
              /\s/g,
              ""
            )}`,
    });
  });
  records.sort((a, b) => new Date(b.date) - new Date(a.date));
  records[0].tag = "New " + records[0].tag;

  return records;
});
