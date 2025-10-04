"use client";

import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import { useEffect } from "react";

// Geist Mono font configuration
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"], // Light and regular weights for thinner appearance
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags */}
        <title>Stephen Hung - EECS Student at UC Berkeley | Full-Stack Developer & ML/AI Enthusiast</title>
        <meta name="title" content="Stephen Hung - EECS Student at UC Berkeley | Full-Stack Developer & ML/AI Enthusiast" />
        <meta name="description" content="Stephen Hung is a sophomore studying EECS at UC Berkeley. Passionate about full-stack development, machine learning, and AI. Explore my portfolio of innovative projects and technical work." />
        <meta name="keywords" content="Stephen Hung, UC Berkeley, EECS, computer science, full-stack developer, machine learning, AI, portfolio, software engineer, Berkeley" />
        <meta name="author" content="Stephen Hung" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stephenhung.me/" />
        <meta property="og:title" content="Stephen Hung - EECS Student at UC Berkeley | Full-Stack Developer" />
        <meta property="og:description" content="Sophomore studying EECS at UC Berkeley. Passionate about full-stack development, machine learning, and AI. Explore my portfolio of innovative projects." />
        <meta property="og:image" content="https://stephenhung.me/og-image.png" />
        <meta property="og:site_name" content="Stephen Hung Portfolio" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://stephenhung.me/" />
        <meta property="twitter:title" content="Stephen Hung - EECS Student at UC Berkeley" />
        <meta property="twitter:description" content="Full-stack developer and ML/AI enthusiast. Explore my portfolio of innovative projects and technical work." />
        <meta property="twitter:image" content="https://stephenhung.me/og-image.png" />
        
        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://stephenhung.me/" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Stephen Hung",
              "url": "https://stephenhung.me",
              "jobTitle": "EECS Student",
              "worksFor": {
                "@type": "Organization",
                "name": "UC Berkeley"
              },
              "alumniOf": {
                "@type": "Organization",
                "name": "UC Berkeley"
              },
              "knowsAbout": [
                "Full-Stack Development",
                "Machine Learning",
                "Artificial Intelligence",
                "Computer Science",
                "Software Engineering"
              ],
              "sameAs": [
                "https://github.com/stephenhungg",
                "https://linkedin.com/in/stephenhung"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistMono.variable} font-mono antialiased bg-black text-white`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
