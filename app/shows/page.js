import { Suspense} from "react";
import Loading from "../loading";
import { getEvents } from "../../lib/getEvents";

export default async function Shows() {
  const events = await getEvents();
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Venue</th>
              <th>Tickets</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.date}>
                <td>
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(e.date)}
                </td>
                <td>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${e.location}`}
                    target="_blank"
                  >
                    {e.title}
                  </a>
                </td>
                <td>{e.tickets}</td>
                <td>
                  <a href={e.link} target="_blank">
                    +
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Suspense>
    </section>
  );
}
