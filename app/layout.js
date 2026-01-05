import { Geist, Geist_Mono } from "next/font/google";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./globals.css";
import { DM_Sans } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kazi Constructions",
  description: "kazi constructions interior designers and developers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.className}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav className ="absolute top-0 left-0 w-full z-50 bg-transparent"/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
