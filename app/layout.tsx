import type { Metadata } from "next";
import type { ReactNode } from "react";

const siteUrl = "https://drdotsolutions.com";
const title =
  "DRDOT Solutions - Transforming Ideas into Digital Reality";
const description =
  "DRDOT Solutions is your technology partner. IT support & networking, Wi-Fi, email & cloud, websites & mobile apps, custom AI software, PCB design, 3D enclosures, and growth marketing.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | DRDOT Solutions",
  },
  description,
  applicationName: "DRDOT Solutions",
  keywords: [
    "DRDOT Solutions",
    "IT support Australia",
    "cloud services Victoria",
    "web development",
    "mobile app development",
    "AI software",
    "PCB design",
    "enclosure design",
    "growth marketing",
    "food ordering system",
    "NxtBite",
    "Officer VIC",
  ],
  authors: [{ name: "DRDOT Solutions" }],
  creator: "DRDOT Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/dr_logo.png",
    apple: "/images/dr_logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "DRDOT Solutions",
    title,
    description,
    images: [
      {
        url: "/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "DRDOT Solutions — Complete Technology Solutions for Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-cover.png"],
  },
};

/** Required root layout for App Router routes (robots.txt, sitemap.xml). */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
