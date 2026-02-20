"use client";

import { useEffect } from "react";

export default function GalleryPrefetcher() {
  useEffect(() => {
    const prefetch = async () => {
      try {
        const response = await fetch('/api/gallery/list');
        if (response.ok) {
          const data = await response.json();
          const images = data.images || [];
          images.forEach((img: { blobUrl?: string }) => {
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
        console.debug('Gallery prefetch skipped:', error);
      }
    };
    const timer = setTimeout(prefetch, 2000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
