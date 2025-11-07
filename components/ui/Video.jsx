export default function Video({ youtubeId, title }) {
  return (
    <iframe
      key={title}
      name={title}
      className="video"
      src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&controls=0&origin=http://localhost:5173`}
      title={title}
      alt={`Music video for ${title}`}
      allowFullScreen
      loading="lazy"
    ></iframe>
  );
}
