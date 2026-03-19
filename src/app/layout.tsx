import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "FEU Tamaraws | UAAP Season 88 Elite Roster",
  description: "Experience the elite roster of the FEU Tamaraws for UAAP Season 88. A premium, high-performance athlete showcase built with Next.js and Framer Motion.",
  keywords: ["FEU", "Tamaraws", "UAAP", "Volleyball", "Next.js", "Framer Motion", "Portfolio"],
  authors: [{ name: "binsacedillo" }],
  openGraph: {
    title: "FEU Tamaraws Elite Roster Database",
    description: "Premium athletic showcase prototype for UAAP Season 88.",
    type: "website",
    locale: "en_US",
    siteName: "FEU UAAP Experience",
  },
  twitter: {
    card: "summary_large_image",
    title: "FEU Tamaraws Elite Roster",
    description: "Modern, dynamic roster prototype for the FEU Tamaraws.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
