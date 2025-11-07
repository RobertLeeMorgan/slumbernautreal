import "server-only";

export async function getEvents() {
  try {
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${process.env.CALENDAR_ID}/events?orderBy=startTime&singleEvents=true&key=${process.env.YOUTUBE_API_KEY}`,
      {
        next: { revalidate: 3600 }, 
      }
    );

    if (!res.ok) {
      throw new Error(`Google Calendar API error: ${res.status}`);
    }

    const data = await res.json();
    if (!data.items?.length) {
      console.warn("No upcoming events found.");
      return [];
    }

    const events = data.items.map((e) => ({
      title: e.summary ?? "Untitled event",
      location: e.location ?? "Location TBA",
      date: new Date(e.start?.dateTime || e.start?.date || Date.now()),
      tickets: e.description ?? "",
      link: e.htmlLink ?? "#",
    }));

    events.sort((a, b) => a.date - b.date);

    return events;
  } catch (err) {
    console.error("Failed to fetch Google Calendar events:", err);
    return [];
  }
}
