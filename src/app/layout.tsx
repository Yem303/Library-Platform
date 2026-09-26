
import { ClerkProvider } from "@clerk/nextjs";


import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


import type { Metadata } from "next";

export const metadata: Metadata = {

  title: {
    template: "%s | iSTAD Library",
    default: "iSTAD Library | Online Book Library",
  },

  description:
    "iSTAD Library is an online book platform where you can discover, search, explore, and manage books across different categories.",

  keywords: [
    "iSTAD Library",
    "ISTAD books",
    "online library",
    "book library",
    "online books",
    "book collection",
    "programming books",
    "fiction books",
    "classic books",
    "romance books",
    "book search",
    "Cambodia library",
  ],

  openGraph: {
    title: "iSTAD Library | Online Book Library",
    description:
      "Discover, search, and explore books with iSTAD Library. Find programming, classic, fiction, romance, and many other books.",
    images: ['thumdnail.png'],

  }
};


export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#FBFAF8]`}
      >
        <body className="min-h-full flex flex-col">
          <Navbar />

          {children}

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
