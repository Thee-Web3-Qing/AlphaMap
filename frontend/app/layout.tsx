import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "../components/ThemeRegistry";
import NavBar from "../components/NavBar";
import PerformanceMonitor from "../components/PerformanceMonitor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlphaMap - Web3 Intelligence Platform",
  description: "Track whales, manage portfolios, discover alpha signals, and visualize wallet relationships across multiple blockchains.",
  keywords: "Web3, DeFi, cryptocurrency, whale tracking, portfolio management, alpha signals, blockchain",
  authors: [{ name: "AlphaMap Team" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AlphaMap - Web3 Intelligence Platform",
    description: "Track whales, manage portfolios, discover alpha signals, and visualize wallet relationships across multiple blockchains.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaMap - Web3 Intelligence Platform",
    description: "Track whales, manage portfolios, discover alpha signals, and visualize wallet relationships across multiple blockchains.",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2F4F2F',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={inter.className}>
        <ThemeRegistry>
          <PerformanceMonitor />
          <NavBar />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
