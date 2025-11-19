"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import VisitorCount from "../components/VisitorCount";
import ParticleBackground from "../components/ParticleBackground";
import TypingAnimation from "../components/TypingAnimation";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setIsLoaded(true), 100);

    // Prefetch gallery images for instant loading
    const prefetchGalleryImages = async () => {
      try {
        const response = await fetch('/api/gallery/list');
        if (response.ok) {
          const data = await response.json();
          const images = data.images || [];
          
          // Preload images in the background
          images.forEach((img: { blobUrl?: string; filename?: string }) => {
            if (img.blobUrl) {
              const link = document.createElement('link');
              link.rel = 'prefetch';
              link.as = 'image';
              link.href = img.blobUrl;
              document.head.appendChild(link);
            }
          });
        }
      } catch (error) {
        // Silently fail - gallery will still work, just not preloaded
        console.debug('Gallery prefetch skipped:', error);
      }
    };

    // Start prefetching after a short delay to not impact initial page load
    setTimeout(prefetchGalleryImages, 2000);
  }, []);

  return (
    <>
      <ParticleBackground />
<main className={`flex flex-col items-center justify-center min-h-[80vh] text-center transition-opacity duration-800 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl sm:text-6xl font-light mb-6 fade-in">
          <TypingAnimation 
            text="Stephen Hung" 
            speed={120}
            delay={800}
            showCursor={true}
            cursorChar="|"
          />
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed fade-in">
          Sophomore studying <strong className="text-blue">EECS at UC Berkeley</strong>. Passionate about <strong className="text-green">full-stack development</strong>, <strong className="text-mauve">machine learning</strong>, and <strong className="text-pink">artificial intelligence</strong>.
        </p>
        <div className="flex gap-6 justify-center fade-in">
          <Link href="/projects" className="text-sm text-teal hover:opacity-80 transition-colors" prefetch={true}>Projects</Link>
          <Link href="/gallery" className="text-sm text-yellow hover:opacity-80 transition-colors" prefetch={true}>Gallery</Link>
          <Link href="/contact" className="text-sm text-peach hover:opacity-80 transition-colors" prefetch={true}>Contact</Link>
        </div>
        <div className="mt-8 fade-in">
          <VisitorCount />
        </div>

        
      </div>
      </main>
    </>
  );
}
