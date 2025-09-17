import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "EncountR",
  description: "Tactical paranormal mapping and research.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-gray-100">
        <Navbar />
        <main className="min-h-screen grid place-items-start">
          {/* scanlines + grid on main app */}
          <div className="relative w-full h-full scanlines grid-overlay">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
