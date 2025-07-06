import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "../components/ThemeRegistry";
import NavBar from "../components/NavBar";

export const metadata: Metadata = {
  title: "AlphaMap - Web3 Intelligence Platform",
  description: "Track whales, manage portfolios, and discover alpha across multiple chains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeRegistry>
          <NavBar />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
