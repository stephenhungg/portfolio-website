'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageTitle: string;
  imageDescription: string;
  imageTags: string[];
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function Lightbox({
  isOpen,
  imageSrc,
  imageTitle,
  imageDescription,
  imageTags,
  onClose,
  onPrevious,
  onNext
}: LightboxProps) {
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrevious) onPrevious();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrevious, onNext]);

  // Swipe gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0 && onNext) {
        // Swiped left, go to next
        onNext();
      } else if (distance < 0 && onPrevious) {
        // Swiped right, go to previous
        onPrevious();
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Close button */}
      <button
        onClick={onClose}
        className={`absolute z-60 text-white hover:text-gray-300 flex items-center justify-center rounded bg-black/80 border border-white/30 hover:border-white transition-colors touch-manipulation ${
          isMobile 
            ? 'top-2 right-2 text-xl w-10 h-10' 
            : 'top-4 right-4 text-2xl w-10 h-10'
        }`}
        aria-label="Close lightbox"
      >
        ×
      </button>

      {/* Navigation buttons - hidden on mobile, use swipe instead */}
      {!isMobile && onPrevious && (
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-60 text-white hover:text-gray-300 text-2xl w-10 h-10 flex items-center justify-center rounded bg-black/80 border border-white/30 hover:border-white transition-colors"
          aria-label="Previous image"
        >
          ←
        </button>
      )}

      {!isMobile && onNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-60 text-white hover:text-gray-300 text-2xl w-10 h-10 flex items-center justify-center rounded bg-black/80 border border-white/30 hover:border-white transition-colors"
          aria-label="Next image"
        >
          →
        </button>
      )}

      {/* Main content */}
      <div 
        className="w-full h-full flex items-center justify-center p-2 sm:p-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-7xl max-h-full flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Image */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div 
              ref={imageRef}
              className={`relative max-w-full w-full h-full flex items-center justify-center ${
                isMobile ? 'max-h-[60vh]' : 'max-h-[80vh]'
              }`}
            >
              <Image
                src={imageSrc}
                alt={imageTitle}
                width={1200}
                height={800}
                className={`max-w-full object-contain rounded-lg shadow-2xl touch-manipulation ${
                  isMobile ? 'max-h-[60vh]' : 'max-h-[80vh]'
                }`}
                onClick={(e) => e.stopPropagation()}
                unoptimized
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </div>
          </div>

          {/* Metadata panel */}
          <div className={`bg-black/90 border border-white/30 rounded-lg p-4 sm:p-6 ${
            isMobile 
              ? 'w-full max-h-[30vh] overflow-y-auto' 
              : 'lg:w-80'
          }`}>
            <h2 className={`font-light text-white mb-2 sm:mb-3 ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}>{imageTitle}</h2>

            {imageDescription && (
              <p className={`text-gray-300 leading-relaxed mb-3 sm:mb-4 ${
                isMobile ? 'text-xs' : 'text-sm'
              }`}>
                {imageDescription}
              </p>
            )}

            {imageTags && imageTags.length > 0 && (
              <div>
                <p className="text-gray-400 text-xs mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {imageTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-black text-gray-300 text-xs rounded-full border border-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!isMobile && (
              <div className="mt-6 pt-4 border-t border-white/30">
                <p className="text-gray-500 text-xs">
                  Press ESC to close • Use arrow keys to navigate
                </p>
              </div>
            )}
            
            {isMobile && (
              <div className="mt-4 pt-3 border-t border-white/30">
                <p className="text-gray-500 text-xs">
                  Swipe left/right to navigate • Tap outside to close
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      />
    </div>
  );
}