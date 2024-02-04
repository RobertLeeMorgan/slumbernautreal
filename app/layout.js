import "./globals.css";
import Template from "../components/layout/Template";

export const metadata = {
  title: "Slumbernaut",
  description:
    "UK based psychedelic indie folk musician and home recording artist.",
  keywords: "indie, folk, psychedelic, band, artist, UK, Cardiff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Template>{children}</Template>
      </body>
    </html>
  );
}
