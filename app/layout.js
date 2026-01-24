import { Geist_Mono } from "next/font/google";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Kazi Constructions | Interior Design & Construction Company Mumbai",
    template: "%s | Kazi Constructions",
  },
  description: "Premium interior design and construction company specializing in residential, commercial, hospitality, and healthcare projects. 40+ years of excellence serving Mumbai and India.",
  keywords: [
    "interior design Mumbai",
    "interior construction company",
    "commercial interior design",
    "residential interior design",
    "hospitality interior design",
    "healthcare interior design",
    "office interior design",
    "turnkey fit-out solutions",
    "Midas Interiors",
    "civil construction Mumbai",
  ],
  authors: [{ name: "Kazi Constructions" }],
  creator: "Kazi Constructions",
  publisher: "Kazi Constructions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.kaziconstructions.com",
    siteName: "Kazi Constructions",
    title: "Kazi Constructions | Interior Design & Construction Company Mumbai",
    description: "Premium interior design and construction company specializing in residential, commercial, hospitality, and healthcare projects. 40+ years of excellence.",
    images: [
      {
        url: "/images/bg1.jpg",
        width: 1200,
        height: 630,
        alt: "Kazi Constructions - Premium Interior Design",
      },
      {
        url: "/images/logo.png",
        width: 200,
        height: 200,
        alt: "Kazi Constructions Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kazi Constructions | Interior Design & Construction Company Mumbai",
    description: "Premium interior design and construction company. 40+ years of excellence.",
    images: ["/images/bg1.jpg"],
    creator: "@kaziconstructions",
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://www.kaziconstructions.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100" />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
