import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const calSans = localFont({
  variable: "--font-cal-sans",
  src: "../public/fonts/CalSans-Regular.ttf",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Sparkline Marketing Firm",
  description: "Creative Marketing Supercharged",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${calSans.variable} h-full antialiased`}>
      <body className="relative min-h-full w-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
