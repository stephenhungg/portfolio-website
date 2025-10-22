'use client';

import { useState, useRef, useEffect } from 'react';

export default function AdminGallery() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [galleryImages, setGalleryImages] = useState<Array<{
    id: string;
    filename?: string;
    blobUrl?: string;
    title?: string;
    description?: string;
    uploadDate: string;
  }>>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Image compression utility
  const compressImage = async (file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob!], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery/list');
      if (response.ok) {
        const galleryData = await response.json();
        setGalleryImages(galleryData.images || []);
      }
    } catch {
      console.error('Error fetching gallery images');
    }
  };

  const handleDelete = async (imageId: string) => {
    setDeleting(imageId);
    try {
      const response = await fetch('/api/gallery/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageId }),
      });

      if (response.ok) {
        setMessage('Image deleted successfully!');
        setDeleteConfirmId(null);
        // Refresh the gallery images
        await fetchGalleryImages();
      } else {
        setMessage('Failed to delete image. Please try again.');
      }
    } catch {
      setMessage('Failed to delete image. Please try again.');
    }
    setDeleting(null);
  };

  // Check for existing authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem('gallery_admin_auth');
        const authTimestamp = localStorage.getItem('gallery_admin_auth_time');

        if (authStatus === 'true' && authTimestamp) {
          const now = Date.now();
          const authTime = parseInt(authTimestamp);
          const EIGHT_HOURS = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

          // Check if authentication is still valid (within 8 hours)
          if (now - authTime < EIGHT_HOURS) {
            setIsAuthenticated(true);
          } else {
            // Clear expired authentication
            localStorage.removeItem('gallery_admin_auth');
            localStorage.removeItem('gallery_admin_auth_time');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
      setIsAuthLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated && !isAuthLoading) {
      fetchGalleryImages();
    }
  }, [isAuthenticated, isAuthLoading]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_GALLERY_PASSWORD || 'gallery2025';
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setMessage('');

      // Store authentication in localStorage with timestamp
      try {
        localStorage.setItem('gallery_admin_auth', 'true');
        localStorage.setItem('gallery_admin_auth_time', Date.now().toString());
      } catch (error) {
        console.error('Error storing authentication:', error);
      }
    } else {
      setMessage('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setMessage('');

    // Clear authentication from localStorage
    try {
      localStorage.removeItem('gallery_admin_auth');
      localStorage.removeItem('gallery_admin_auth_time');
    } catch (error) {
      console.error('Error clearing authentication:', error);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMessage('Processing image...');

      try {
        // Show original preview first
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Show file size info
        const originalSize = (file.size / 1024 / 1024).toFixed(2);
        setMessage(`Original size: ${originalSize}MB - Compressing...`);

        // Compress if file is larger than 2MB
        if (file.size > 2 * 1024 * 1024) {
          const compressedFile = await compressImage(file);
          const compressedSize = (compressedFile.size / 1024 / 1024).toFixed(2);
          setMessage(`Compressed: ${originalSize}MB → ${compressedSize}MB`);

          // Replace the file input with compressed version
          const dt = new DataTransfer();
          dt.items.add(compressedFile);
          if (fileInputRef.current) {
            fileInputRef.current.files = dt.files;
          }
        } else {
          setMessage(`File size: ${originalSize}MB (no compression needed)`);
        }
      } catch (error) {
        console.error('Error processing image:', error);
        setMessage('Error processing image. Please try again.');
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileInputRef.current?.files?.[0]) return;

    setUploading(true);
    const file = fileInputRef.current.files[0];

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('title', formData.title);
    uploadFormData.append('description', formData.description);

    try {
      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (response.ok) {
        setMessage('Photo uploaded successfully!');
        setFormData({ title: '', description: '' });
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        // Refresh the gallery images
        await fetchGalleryImages();
      } else {
        setMessage('Upload failed. Please try again.');
      }
    } catch {
      setMessage('Upload failed. Please try again.');
    }

    setUploading(false);
  };

  if (isAuthLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-black border border-white rounded-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-light mb-6 text-center text-white">Gallery Admin</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
                placeholder="Enter admin password"
                required
              />
            </div>
            {message && (
              <p className="text-red-400 text-sm">{message}</p>
            )}
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-900 text-white border border-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Access Gallery Admin
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light text-white">Gallery Admin</h1>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-300 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-black border border-white rounded-xl p-6">
          <h2 className="text-xl font-light text-white mb-6">Upload New Photo</h2>

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm text-white mb-2">Select Photo</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full px-4 py-3 bg-black border border-white rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-black hover:file:bg-gray-200 file:transition-colors"
                required
              />
            </div>

            {preview && (
              <div className="relative">
                <label className="block text-sm text-white mb-2">Preview</label>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-w-sm rounded-lg border border-white"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-white mb-2">Title (optional)</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
                placeholder="Photo title"
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-2">Description (optional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white h-24 resize-none"
                placeholder="Photo description"
              />
            </div>


            {message && (
              <p className={`text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-black hover:bg-gray-900 text-white border border-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </form>
        </div>

        {/* Gallery Management Section */}
        {galleryImages.length > 0 && (
          <div className="bg-black border border-white rounded-xl p-6 mt-8">
            <h2 className="text-xl font-light text-white mb-6">Manage Gallery Images</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image) => (
                <div key={image.id} className="bg-black border border-white rounded-lg p-4">
                  <img
                    src={image.blobUrl || `/images/gallery/${image.filename}`}
                    alt={image.title || 'Gallery image'}
                    className="w-full h-32 object-cover rounded border border-white mb-3"
                  />
                  <div className="space-y-2">
                    <h3 className="text-white text-sm font-medium">
                      {image.title || 'Untitled'}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {new Date(image.uploadDate).toLocaleDateString()}
                    </p>
                    {image.description && (
                      <p className="text-gray-300 text-xs line-clamp-2">
                        {image.description}
                      </p>
                    )}
                    <button
                      onClick={() => setDeleteConfirmId(image.id)}
                      disabled={deleting === image.id}
                      className="w-full bg-red-900 hover:bg-red-800 text-red-300 border border-red-700 px-3 py-2 rounded text-xs transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleting === image.id ? 'Deleting...' : 'Delete Image'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-black border border-white rounded-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-light text-white mb-4">Confirm Deletion</h3>
              <p className="text-gray-300 text-sm mb-6">
                Are you sure you want to delete this image? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 bg-black hover:bg-gray-900 text-white border border-white px-4 py-2 rounded transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  disabled={deleting === deleteConfirmId}
                  className="flex-1 bg-red-900 hover:bg-red-800 text-red-300 border border-red-700 px-4 py-2 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting === deleteConfirmId ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="/gallery"
            className="text-white hover:text-gray-300 transition-colors"
          >
            ← Back to Gallery
          </a>
        </div>
      </div>
    </main>
  );
}