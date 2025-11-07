import Video from "./Video";
import Wrapper from "./Wrapper";

export default function Videos({ ids }) {
  return (
    <Wrapper title="Videos">
      {ids.map((e) => (
        <Video key={e.id} youtubeId={e.id} title={e.title} />
      ))}
    </Wrapper>
  );
}
