export async function getVideos() {
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
      return youtubeId
}