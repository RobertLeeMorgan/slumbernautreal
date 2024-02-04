export async function getEvents() {
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

  return events;
}
