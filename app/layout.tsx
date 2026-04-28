import type { Metadata } from "next";
import localFont from "next/font/local";
import { ForceNewTabLinks } from "@/components/force-new-tab-links";
import "./globals.css";

const calSans = localFont({
  variable: "--font-cal-sans",
  src: "../public/fonts/CalSans-Regular.ttf",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Dockclaw",
  description: "Creative Marketing Supercharged",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${calSans.variable} h-full antialiased`}>
      <head>
        <base target="_blank" />
      </head>
      <body className="relative min-h-full w-full flex flex-col">
        <ForceNewTabLinks />
        {children}
      </body>
    </html>
  );
}
