'use client';

import { useState, useEffect } from 'react';
import Masonry from '../../components/Masonry';
import Lightbox from '../../components/Lightbox';

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryData, setGalleryData] = useState<{
    images: Array<{
      id: string;
      title?: string;
      description?: string;
      blobUrl?: string;
      filename?: string;
    }>;
    metadata: { totalImages: number };
  }>({ images: [], metadata: { totalImages: 0 } });
  const [galleryItems, setGalleryItems] = useState<Array<{
    id: string;
    img: string;
    url: string;
    height: number;
    title?: string;
    description?: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/gallery/list');
        if (response.ok) {
          const data = await response.json();
          setGalleryData(data);

          // Convert to masonry format with Blob URLs or fallback to local images
          const items = data.images.map((image: {
            id: string;
            title?: string;
            description?: string;
            blobUrl?: string;
            filename?: string;
          }, index: number) => ({
            id: image.id,
            img: image.blobUrl || `/images/gallery/${image.filename}`,
            url: image.blobUrl || `/images/gallery/${image.filename}`,
            height: 300 + (index % 4) * 100,
            title: image.title,
            description: image.description
          }));
          setGalleryItems(items);
        }
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

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
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className={`text-center ${theme === 'catppuccin' ? 'text-gray-400-theme' : 'text-gray-400'}`}>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mx-auto mb-4"></div>
              Loading gallery...
            </div>
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className={`text-center ${theme === 'catppuccin' ? 'text-gray-400-theme' : 'text-gray-400'}`}>
              No images in gallery yet.
            </div>
          </div>
        ) : (
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
        )}
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