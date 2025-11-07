import Cards from "./Cards";
import Wrapper from "./Wrapper";

export default function Records({ releases }) {
  return (
    <Wrapper title="Releases" line>
      {releases.map((record) => (
        <Cards key={record.id} record={record} />
      ))}
    </Wrapper>
  );
}
