"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isNewVisitor, setIsNewVisitor] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Check if this is a new visitor (using sessionStorage for this session)
        const hasVisitedThisSession = sessionStorage.getItem('hasVisitedThisSession');
        
        if (!hasVisitedThisSession) {
          // This is a new visitor in this session
          setIsNewVisitor(true);
          sessionStorage.setItem('hasVisitedThisSession', 'true');
          
          // Increment the server-side visitor count
          const response = await fetch('/api/visitors', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            setVisitorCount(data.count);
          }
        } else {
          // Returning visitor in this session - just get the current count
          const response = await fetch('/api/visitors', {
            method: 'GET',
          });
          
          if (response.ok) {
            const data = await response.json();
            setVisitorCount(data.count);
          }
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
        // Fallback to a default count
        setVisitorCount(1);
      }

      // Trigger fade-in animation
      setTimeout(() => setIsLoaded(true), 100);
    };

    trackVisitor();
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
