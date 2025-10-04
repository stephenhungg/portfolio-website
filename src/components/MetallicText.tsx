'use client';

import { useState, useEffect } from 'react';
import MetallicPaint, { parseLogoImage } from './MetallicPaint';

interface MetallicTextProps {
  text: string;
  className?: string;
}

function createTextImage(text: string): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // Set canvas size
    canvas.width = 1200;
    canvas.height = 400;
    
    // Fill with white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text properties
    ctx.fillStyle = 'black';
    ctx.font = '300 120px "Geist Mono", "SF Mono", "Monaco", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw text
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    // Convert to blob and then to file
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'text.png', { type: 'image/png' });
        resolve(file);
      }
    }, 'image/png');
  });
}

export default function MetallicText({ text, className = '' }: MetallicTextProps) {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadImageFromFile() {
      try {
        setIsLoading(true);
        
        // Load the image from public folder
        const response = await fetch('/name.jpeg');
        const blob = await response.blob();
        const file = new File([blob], 'name.jpeg', { type: blob.type });
        
        const parsedData = await parseLogoImage(file);
        setImageData(parsedData.imageData);
      } catch (err) {
        console.error("Error loading image:", err);
        // Fallback to text generation if image fails
        try {
          const textFile = await createTextImage(text);
          const parsedData = await parseLogoImage(textFile);
          setImageData(parsedData.imageData);
        } catch (fallbackErr) {
          console.error("Error with fallback text generation:", fallbackErr);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadImageFromFile();
  }, [text]);

  if (isLoading || !imageData) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-4xl sm:text-6xl font-light text-white opacity-50">
          {text}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <MetallicPaint 
        imageData={imageData} 
        params={{ 
          edge: 2, 
          patternBlur: 0.008, 
          patternScale: 2.5, 
          refraction: 0.02, 
          speed: 0.4, 
          liquid: 0.1 
        }} 
      />
    </div>
  );
}
