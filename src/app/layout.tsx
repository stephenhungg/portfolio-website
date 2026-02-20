import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { ThemeProvider } from "../contexts/ThemeContext";
import MouseTracker from "../components/MouseTracker";

// Geist Mono font configuration
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"], // Light and regular weights for thinner appearance
});

export const metadata: Metadata = {
  title: "Stephen Hung's Portfolio",
  description: "Stephen Hung is a sophomore studying EECS at UC Berkeley. Passionate about full-stack development, machine learning, and AI. Explore my portfolio of innovative projects and technical work.",
  keywords: ["Stephen Hung", "UC Berkeley", "EECS", "computer science", "full-stack developer", "machine learning", "AI", "portfolio", "software engineer", "Berkeley"],
  authors: [{ name: "Stephen Hung" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://stephenhung.me/",
    title: "Stephen Hung's Portfolio",
    description: "Sophomore studying EECS at UC Berkeley. Passionate about full-stack development, machine learning, and AI. Explore my portfolio of innovative projects.",
    images: [{ url: "https://stephenhung.me/og-image.png" }],
    siteName: "Stephen Hung Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stephen Hung's Portfolio",
    description: "Full-stack developer and ML/AI enthusiast. Explore my portfolio of innovative projects and technical work.",
    images: ["https://stephenhung.me/og-image.png"],
  },
  metadataBase: new URL("https://stephenhung.me"),
  alternates: {
    canonical: "/",
  },
  other: {
    "theme-color": "#000000",
    "revisit-after": "7 days",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline theme script to prevent flash of incorrect theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='catppuccin'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else{document.documentElement.setAttribute('data-theme','dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`,
          }}
        />
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
        className={`${geistMono.variable} font-mono antialiased`}
      >
        <MouseTracker />
        <ThemeProvider>
          <Navigation />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
