'use client';

import { useState } from 'react';
import Masonry from '../../components/Masonry';
import Lightbox from '../../components/Lightbox';
import galleryData from '../../data/gallery.json';

// Convert gallery data to masonry format
const galleryItems = galleryData.images.map((image, index) => ({
  id: image.id,
  img: `/images/gallery/${image.filename}`,
  url: `/images/gallery/${image.filename}`, // Click to view full size
  height: 300 + (index % 4) * 100, // Vary heights for masonry effect
  title: image.title,
  description: image.description
}));

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (item: { id: string; img: string; title?: string; description?: string }) => {
    const index = galleryItems.findIndex(img => img.id === item.id);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : galleryItems.length - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev < galleryItems.length - 1 ? prev + 1 : 0
    );
  };

  const currentImage = galleryItems[currentImageIndex];

  return (
    <main className="max-w-7xl mx-auto pt-20 pb-12 px-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-light text-center fade-in text-pink flex-1">Gallery</h1>
        <a
          href="/admin/gallery"
          className="text-xs text-gray-500 hover:text-white transition-colors px-3 py-1 rounded border border-gray-600/30 hover:border-white"
        >
          Admin
        </a>
      </div>
      <p className="text-gray-400 text-center mb-12 fade-in">
        A collection of photos and moments. ({galleryData.metadata.totalImages} photos)
      </p>

      <div className="min-h-screen">
        <Masonry
          items={galleryItems}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={1.5}
          blurToFocus={true}
          colorShiftOnHover={false}
          onImageClick={handleImageClick}
        />
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        imageSrc={currentImage?.img || ''}
        imageTitle={currentImage?.title || ''}
        imageDescription={currentImage?.description || ''}
        imageTags={[]}
        onClose={() => setLightboxOpen(false)}
        onPrevious={galleryItems.length > 1 ? handlePrevious : undefined}
        onNext={galleryItems.length > 1 ? handleNext : undefined}
      />
    </main>
  );
}