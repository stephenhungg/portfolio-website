"use client";

import { useState, useEffect } from "react";
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
      <main className={`flex flex-col items-center justify-center min-h-[85vh] sm:min-h-[90vh] text-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          
          {/* Main Heading */}
          <div className="mb-6 sm:mb-8 fade-in">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4 sm:mb-6 text-white drop-shadow-lg px-2">
              <TypingAnimation 
                text="Stephen Hung" 
                speed={100}
                delay={500}
                showCursor={true}
                cursorChar="|"
              />
            </h1>
          </div>

          {/* Subtitle */}
          <div className="fade-in" style={{ animationDelay: '200ms' }}>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed sm:leading-relaxed font-light max-w-2xl mx-auto px-3 sm:px-0">
              Sophomore at <span className="text-blue font-medium relative inline-block group">
                UC Berkeley
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue/50 transform scale-x-0 transition-transform group-hover:scale-x-100 duration-300 origin-left"></span>
              </span> studying EECS.
              <br className="hidden sm:block" />
              <span className="block sm:inline">Building the future with </span>
              <span className="text-green font-medium">Full-Stack</span>, <span className="text-mauve font-medium">ML</span>, and <span className="text-pink font-medium">AI</span>.
            </p>
          </div>

          {/* Footer / Stats */}
          <div className="fade-in opacity-80" style={{ animationDelay: '400ms' }}>
             <VisitorCount />
          </div>
          
        </div>
      </main>
    </>
  );
}
