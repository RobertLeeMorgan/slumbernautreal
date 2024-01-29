import "./globals.css";
import Layout from "../components/layout/layout";
import { CartContextProvider } from "../components/merch/store/CartContext";
import { UserProgressContextProvider } from "../components/merch/store/UserProgressContext";

export const metadata = {
  title: "Slumbernaut",
  description:
    "UK based psychedelic indie folk musician and home recording artist.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProgressContextProvider>
          <CartContextProvider>
            <Layout>{children}</Layout>
          </CartContextProvider>
        </UserProgressContextProvider>
      </body>
    </html>
  );
}
