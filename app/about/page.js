import { Suspense } from "react";
import Loading from "../loading";
import { getBio } from "../../lib/getBio";

export default async function About() {
  const bio = await getBio();

  return (
    <section className="about">
      <Suspense fallback={<Loading />}>
        {bio.map((e) => (
          <p key={Math.floor(Math.random() * 100)}>{e}</p>
        ))}
      </Suspense>
    </section>
  );
}
