export async function getVideos() {
  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLkXmbLiHyeLD4FrejYf5MJ3jTKCa3gl4V&key=${process.env.YOUTUBE_API_KEY}`,
      {
        next: { revalidate: 43200 },
      }
    );

    if (!res.ok) {
      throw new Error(`YouTube API error: ${res.status}`);
    }

    const data = await res.json();
    const items = data?.items ?? [];

    if (!items.length) {
      console.warn("No YouTube videos found for playlist.");
      return [];
    }

    const videos = items
      .filter((e) => e.snippet?.resourceId?.videoId)
      .map((e) => ({
        id: e.snippet.resourceId.videoId,
        title: e.snippet.title,
        thumbnail:
          e.snippet.thumbnails?.medium?.url ||
          e.snippet.thumbnails?.default?.url ||
          "",
        publishedAt: e.snippet.publishedAt,
      }));

    videos.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );

    return videos;
  } catch (err) {
    console.error("Failed to fetch YouTube videos:", err);
    return [];
  }
}