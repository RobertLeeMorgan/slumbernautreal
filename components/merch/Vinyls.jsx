import { Suspense } from "react";
import Vinyl from "./Vinyl";
import Loading from "../../app/loading";
import { getRecords } from "../../lib/getRecords";

export default async function Vinyls() {

  const records = await getRecords();
    

  return (
    <ul id="vinyls">
      <Suspense fallback={<Loading />}>
        {records.map((e) => (
          <Vinyl key={e.id} vinyl={e} />
        ))}
      </Suspense>
    </ul>
  );
}
