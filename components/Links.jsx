import {
  FaSpotify,
  FaApple,
  FaInstagram,
  FaBandcamp,
  FaYoutube,
} from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";

export default function Links() {
  return (
    <p className="icons">
      <a
        href="https://open.spotify.com/artist/4Z4SX46wN0h6BL8geY82nt"
        target="_blank"
      >
        <FaSpotify />
      </a>
      <a
        href="https://music.apple.com/us/artist/slumbernaut/1496457270"
        target="_blank"
      >
        <FaApple />
      </a>
      <a href="https://www.instagram.com/slumbernaut/?hl=en" target="_blank">
        <FaInstagram />
      </a>
      <a href="https://slumbernaut.bandcamp.com/album/phases" target="_blank">
        <FaBandcamp />
      </a>
      <a href="https://www.youtube.com/@slumbernautband" target="_blank">
        <FaYoutube />
      </a>
      <a
        href="https://www.youtube.com/channel/UC3j10n7jg694Mj5MNx_p7uQ"
        target="_blank"
      >
        <SiYoutubemusic />
      </a>
    </p>
  );
}
