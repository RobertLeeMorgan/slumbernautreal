# 🎧 Slumbernaut

A dynamic artist website built with **Next.js** and **React** that automatically syncs live content from **Spotify**, **YouTube**, and **Google Calendar** APIs.  
Artists can update their site simply by editing their connected platforms — **no manual updates needed**.  

Fully themable, lightweight, and designed as a **plug-and-play framework** for independent musicians.

🌐 **Live Demo:** [slumbernautreal.vercel.app](https://slumbernautreal.vercel.app)

---

## 🚀 Features

- 🎵 **Spotify integration** – Displays live releases and artist data  
- 📺 **YouTube integration** – Auto-fetches recent uploads or playlists  
- 📅 **Google Calendar integration** – Syncs and displays upcoming events  
- 💌 **EmailJS contact form** – Easy fan or booking inquiries  
- 🛍️ **Demo store** – Example of React Context and state management  
- 🌗 **Dark/Light theming** – Controlled via `react-switch`, customizable with CSS variables  
- ⚡ **Fast & Modern Stack** – Next.js App Router, Suspense, and server actions

---

## 🧰 Tech Stack

- **Next.js 15**  
- **React 18**  
- **EmailJS**, **Spotify API**, **YouTube Data API**, **Google Calendar API**  
- **React Toastify**, **React Loader Spinner**, **React Switch**  
- **CSS Variables** for theming  
- **Deployed on Vercel**

---

## ⚙️ Setup Guide

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/slumbernaut.git
cd slumbernaut
npm install
```

### 2. Environment Variables
Create a .env.local file in the project root and add your credentials:

```bash
NEXT_PUBLIC_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_TEMPLATE_ID=your_emailjs_template_id

YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_PLAYLIST_ID=your_youtube_playlist_id
SPOTIFY_ARTIST_ID=your_spotify_artist_id
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret

CHANNEL_ID=your_youtube_channel_id
CALENDAR_ID=your_google_calendar_id

ARTIST_NAME="Your Artist Name"
ARTIST_TAGLINE="Your Tagline Here"
```
💡 Tip: Keep Spotify, YouTube, and Google keys server-side only.

### 3. Run the App
```bash
npm run dev
```
Then visit http://localhost:3000

---

## 🎨 Customization Guide
Everything is designed to be easy to modify without digging deep into code.

1. Update Site Links
Edit all artist-specific links inside:

```bash
/components/Links.tsx
```
You can change social links, external URLs, or add new ones as needed.

2. Update Metadata
Edit metadata in:

```bash
/app/layout.js
```
This includes site title, description, and default SEO tags.

3. Theme & Fonts
All colors, fonts, and gradients are set in:

```bash
/app/global.css
```
You can easily change the global look by editing the CSS variables:

**CSS**
```
:root {
  --ff-primary: Inter, system-ui, sans-serif;
  --ff-accent: Space Mono, monospace;
  --ff-secondary: "Franklin Gothic Medium", sans-serif;
}

.dark {
  --clr-primary-900: #1a1a20;
  --clr-accent-400: #7913a8;
  --clr-button: #25252d;
  /* ...etc */
}

.light {
  --clr-primary-900: linear-gradient(135deg, #a8acff, #a5bdfd);
  --clr-accent-400: #6d000f;
  --clr-button: #d5d5f3;
  /* ...etc */
}
```
🎨 Pro Tip: Adjust only the variables under .dark and .light to instantly re-theme the site.

## 🧩 Project Structure

```
/app
  ├── layout.js          → Site metadata and structure
  ├── page.js            → Homepage logic
  ├── global.css         → Global styles and themes
  └── loading.js         → Suspense fallback loader

/components
  ├── ui/Records.js      → Spotify releases
  ├── ui/Videos.js       → YouTube embeds
  ├── ui/Events.js       → Google Calendar integration
  ├── Links.tsx          → Artist’s external links

/lib
  ├── getRecords.js      → Fetches Spotify data
  ├── getVideos.js       → Fetches YouTube videos
  ├── getEvents.js       → Fetches Calendar events
```

---

## 🧪 Deployment
To deploy on Vercel:

```bash
npm run build
```
Push your repo to GitHub and connect it to Vercel — it will automatically detect Next.js and set up the build process.

## 💬 Contact
Created by Rob
💻 Web Developer | 🎸 Musician

📜 License
MIT © 2025 Robert Morgan
