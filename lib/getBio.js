import "server-only";

export async function getBio() {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${process.env.CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}`,
      {
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      throw new Error(`YouTube API error: ${res.status}`);
    }

    const data = await res.json();
    const snippet = data?.items?.[0]?.snippet;

    if (!snippet?.description) {
      console.warn("No description found in YouTube API response");
      return [];
    }

    const lines = snippet.description
      .split(/\r?\n|\r|\n/g)
      .map((line) => line.trim())
      .filter(Boolean);

    return lines;
  } catch (err) {
    console.error("Failed to fetch YouTube bio:", err);
    return [];
  }
}

