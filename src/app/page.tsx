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
          Sophomore studying <strong>EECS at UC Berkeley</strong>. Passionate about <strong>full-stack development</strong>, <strong>machine learning</strong>, and <strong>artificial intelligence</strong>.
        </p>
        <div className="flex gap-6 justify-center fade-in">
          <a href="/projects" className="text-sm hover:text-gray-400 transition-colors">Projects</a>
          <a href="/contact" className="text-sm hover:text-gray-400 transition-colors">Contact</a>
        </div>
        <div className="mt-8 fade-in">
          <VisitorCount />
        </div>

        
      </div>
      </main>
    </>
  );
}
