"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isNewVisitor, setIsNewVisitor] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if this is a new visitor
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // This is a new visitor
      setIsNewVisitor(true);
      localStorage.setItem('hasVisited', 'true');
      
      // Get current visitor count and increment it
      const currentCount = parseInt(localStorage.getItem('visitorCount') || '0');
      const newCount = currentCount + 1;
      localStorage.setItem('visitorCount', newCount.toString());
      setVisitorCount(newCount);
    } else {
      // Returning visitor - just show the current count
      const currentCount = parseInt(localStorage.getItem('visitorCount') || '0');
      setVisitorCount(currentCount);
    }

    // Trigger fade-in animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <main className={`flex flex-col items-center justify-center min-h-[80vh] text-center transition-opacity duration-800 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-2xl mx-auto px-4">
        {isNewVisitor && visitorCount && (
          <div className="mb-8 p-4 border border-gray-800 rounded-lg bg-gray-900 fade-in">
            <p className="text-sm text-gray-400">
              You are visitor #{visitorCount} to visit this site!
            </p>
          </div>
        )}
        
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
