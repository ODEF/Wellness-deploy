import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "../components/layout/SiteChroma"

export const metadata: Metadata = {
  title: "Dogs Wellness Co.",
  description: "Personalised wellness care for dogs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}