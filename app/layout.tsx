import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Girl Math",
    template: "%s · Girl Math",
  },
  description:
    "Fun calculators for validating purchases you were already going to make.",
  metadataBase: new URL("https://girlmath.vercel.app"), // update when custom domain exists
  openGraph: {
    title: "Girl Math",
    description:
      "Check your math. Respectfully.",
    url: "https://girlmath.vercel.app",
    siteName: "Girl Math",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Girl Math",
    description: "Check your math. Respectfully.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
