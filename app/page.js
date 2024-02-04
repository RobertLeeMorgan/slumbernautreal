import Records from "../components/Records";
import Videos from "../components/Videos";
import { Suspense } from "react";
import Loading from "./loading";
import { getRecords } from "../lib/getRecords";
import { getVideos } from "../lib/getVideos";

export default async function Home() {
  const records = await getRecords();
  
  const youtubeIds = await getVideos()

  return (
    <Suspense fallback={<Loading />}>
      <Records releases={records} />
      <Videos ids={youtubeIds} />
    </Suspense>
  );
}
