import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
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
  title: "Mohamed Alromaihi | Full-Stack Developer & Cybersecurity Expert",
  description: "Portfolio of Mohamed Saud Alromaihi - Full-Stack Developer, Cybersecurity Technician, and former Military Officer. Specializing in React, Next.js, TypeScript, Flutter, and secure web applications.",
  keywords: ["Full-Stack Developer", "Cybersecurity", "React", "Next.js", "TypeScript", "Flutter", "Bahrain", "Web Developer", "Mobile App Developer"],
  authors: [{ name: "Mohamed Saud Alromaihi" }],
  openGraph: {
    title: "Mohamed Alromaihi | Full-Stack Developer & Cybersecurity Expert",
    description: "Portfolio of Mohamed Saud Alromaihi - Full-Stack Developer, Cybersecurity Technician, and former Military Officer.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Alromaihi | Full-Stack Developer",
    description: "Full-Stack Developer & Cybersecurity Expert from Bahrain",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>
          <div className="bg-noise" />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
