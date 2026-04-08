import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wall Calendar — Interactive Date Picker",
  description: "A minimal interactive wall calendar with day-range selection and integrated notes.",
  openGraph: {
    title: "Wall Calendar",
    description: "Interactive wall calendar with range selection & notes",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
