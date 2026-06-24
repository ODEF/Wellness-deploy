import type { Metadata } from "next";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Healthy Paw",
  description: "Wellness website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><h1>Healthy Paw</h1><p>Webbsite is working on Vercel.</p></body>
    </html>
    )
  }
}
