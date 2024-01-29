"use client";

import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";

export default function Shows() {
  const [event, setEvent] = useState([
    { location: "", title: "", date: "", tickets: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${process.env.NEXT_PUBLIC_CALENDAR_ID}/events?orderBy=startTime&singleEvents=true&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
        {
          cache: "force-cache",
        }
      );
      const data = await res.json();
      const events = [];

      data.items.forEach((e) => {
        events.push({
          location: e.location,
          title: e.summary,
          date: new Date(e.start.dateTime),
          tickets: e.description,
          link: e.htmlLink,
        });
      });
      setEvent((curr) => [...events]);
    };

    fetchData().catch(console.error);
    setIsLoading(() => false)
  }, []);

  if (isLoading) {
    return (
      <div className="loader">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="purple"
          ariaLabel="loading"
          wrapperStyle
        />
      </div>
    );
  }

  return (
    <section>
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
          {event.map((e) => (
            <tr key={e.date}>
              <td>{new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(e.date)}</td>
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
    </section>
  );
}
