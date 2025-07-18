"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <main className={`flex flex-col items-center justify-center min-h-[80vh] text-center transition-opacity duration-800 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 fade-in">
          Stephen Hung
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 mb-8 leading-relaxed fade-in">
          Sophomore studying EECS at UC Berkeley. Passionate about full-stack development and ML/AI.
        </p>
        <div className="flex gap-6 justify-center fade-in">
          <a href="/projects" className="text-sm hover:text-gray-400 transition-colors">Projects</a>
          <a href="/contact" className="text-sm hover:text-gray-400 transition-colors">Contact</a>
        </div>
      </div>
    </main>
  );
}
