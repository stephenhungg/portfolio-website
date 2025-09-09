"use client";

import { useState, useEffect } from 'react';

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndIncrementCount = async () => {
      try {
        // First increment the count
        const incrementResponse = await fetch('/api/visitor-count', {
          method: 'POST',
        });
        
        if (incrementResponse.ok) {
          const data = await incrementResponse.json();
          setCount(data.count);
        } else {
          // If increment fails, try to get current count
          const getResponse = await fetch('/api/visitor-count');
          if (getResponse.ok) {
            const data = await getResponse.json();
            setCount(data.count);
          }
        }
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndIncrementCount();
  }, []);

  if (isLoading) {
    return (
      <div className="text-sm text-gray-500 animate-pulse">
        Loading visitor count...
      </div>
    );
  }

  return (
    <div className="text-sm text-gray-500">
      <span className="font-mono">{count?.toLocaleString() || '0'}</span> visitors
    </div>
  );
}
