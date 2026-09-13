import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { AppProvider } from "@/context/AppContext";
import { Analytics } from "@vercel/analytics/react";
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
  metadataBase: new URL("https://portfolio-msr-bh.vercel.app"),
  title: "Mohamed Alromaihi | Full-Stack Developer & Cybersecurity Expert",
  description: "Portfolio of Mohamed Saud Alromaihi - Full-Stack Developer, Cybersecurity Technician, and former Military Officer. Specializing in React, Next.js, TypeScript, Flutter, and secure web applications.",
  keywords: [
    "MOHAMED SAUD ALROMAIHI", "محمد سعود الرميحي", "MOHAMED ALROMAIHI CV", "سيرة ذاتية محمد سعود الرميحي",
    "Military Officer Developer", "ضابط عسكري مبرمج", "Cybersecurity Military Expert", "تقنية معلومات عسكرية",
    "Programming Languages", "لغات البرمجة", "Python", "JavaScript", "Dart", "Kotlin", "SQL",
    "GitHub Portfolio", "بورتفوليو مبرمج", "Full-Stack Developer", "Cybersecurity Expert", "React Developer",
    "Next.js Developer", "TypeScript Specialist", "Flutter Developer", "Mobile App Development", "Bahrain Developer",
    "Software Engineer", "Secure Coding", "Penetration Testing Specialist", "Cybersecurity Technician",
    "مطور تطبيقات ذكي", "خبير أمن سيبراني محترف", "مبرمج فول ستاك البحرين", "تطوير مواقع إنترنت", "برمجة تطبيقات الهاتف",
    "Web Security", "Cloud Computing", "Vercel", "MongoDB", "PostgreSQL", "Firebase", "Node.js Developer",
    "Kingdom of Bahrain", "المنامة", "Manama", "Bahrain IT", "تقنية المعلومات البحرين", "Portfolio GitHub"
  ],
  authors: [{ name: "MOHAMED SAUD ALROMAIHI" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mohamed Alromaihi | Full-Stack Developer & Cybersecurity Expert",
    description: "Portfolio of Mohamed Saud Alromaihi - Full-Stack Developer, Cybersecurity Technician, and former Military Officer.",
    type: "website",
    locale: "en_US",
    url: "https://portfolio-msr-bh.vercel.app",
    siteName: "Mohamed Alromaihi Portfolio",
    images: [{ url: "/assets/My-pics/1.png", alt: "Mohamed Alromaihi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Alromaihi | Full-Stack Developer",
    description: "Full-Stack Developer & Cybersecurity Expert from Bahrain",
    images: ["/assets/My-pics/1.png"],
  },
  verification: {
    google: "ycNyhEdJMXnREHv1Ez1RlLYDNN-sC5AlVPe9oyfh4l4",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohamed Saud Alromaihi",
    url: "https://portfolio-msr-bh.vercel.app",
    jobTitle: "Full-Stack Developer and Cybersecurity Technician",
    description: "Full-Stack Developer and Cybersecurity Technician from Bahrain specializing in React, Next.js, TypeScript, Flutter, and secure web applications.",
    image: "https://portfolio-msr-bh.vercel.app/assets/My-pics/1.png",
    address: {
      "@type": "PostalAddress",
      addressCountry: "BH",
      addressLocality: "Manama",
    },
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2259594031936212"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="person-schema" type="application/ld+json">
          {JSON.stringify(personSchema)}
        </Script>
        <AppProvider>
          <div className="bg-noise" />
          {children}
          <Analytics />
        </AppProvider>
      </body>
    </html>
  );
}
