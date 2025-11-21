'use client';

import { useEffect } from 'react';
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 text-white hover:text-gray-300 text-2xl w-10 h-10 flex items-center justify-center rounded bg-black border border-white hover:border-gray-300 transition-colors"
        aria-label="Close lightbox"
      >
        ×
      </button>

      {/* Navigation buttons */}
      {onPrevious && (
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-60 text-white hover:text-gray-300 text-2xl w-10 h-10 flex items-center justify-center rounded bg-black border border-white hover:border-gray-300 transition-colors"
          aria-label="Previous image"
        >
          ←
        </button>
      )}

      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-60 text-white hover:text-gray-300 text-2xl w-10 h-10 flex items-center justify-center rounded bg-black border border-white hover:border-gray-300 transition-colors"
          aria-label="Next image"
        >
          →
        </button>
      )}

      {/* Main content */}
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="max-w-7xl max-h-full flex flex-col lg:flex-row gap-6">
          {/* Image */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative max-w-full max-h-[80vh] w-full h-full flex items-center justify-center">
              <Image
                src={imageSrc}
                alt={imageTitle}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                unoptimized
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>

          {/* Metadata panel */}
          <div className="lg:w-80 bg-black border border-white rounded-xl p-6">
            <h2 className="text-xl font-light text-white mb-3">{imageTitle}</h2>

            {imageDescription && (
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
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
                      className="px-2 py-1 bg-black text-gray-300 text-xs rounded-full border border-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white">
              <p className="text-gray-500 text-xs">
                Press ESC to close • Use arrow keys to navigate
              </p>
            </div>
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