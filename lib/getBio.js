export async function getBio() {
  const desc = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${process.env.NEXT_PUBLIC_CHANNEL_ID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    { cache: "force-cache" }
  );
  const results = await desc.json();
  const description = results.items[0].snippet.description;
  const ps = description.split(/\r?\n|\r|\n/g);
  return ps.filter(function (v, i) {
    return i % 2 == 0;
  });
}
