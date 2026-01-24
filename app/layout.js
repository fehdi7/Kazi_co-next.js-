import { Geist_Mono } from "next/font/google";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kazi Constructions | Interior Design & Construction",
  description: "Premium interior design and construction company specializing in residential, commercial, hospitality, and healthcare projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
