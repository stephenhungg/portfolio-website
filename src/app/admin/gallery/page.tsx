'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export default function AdminGallery() {
  const { theme } = useTheme();
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
        if (typeof window !== "undefined" && typeof localStorage !== "undefined" && typeof localStorage.getItem === "function") {
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
        if (typeof window !== "undefined" && typeof localStorage !== "undefined" && typeof localStorage.setItem === "function") {
          localStorage.setItem('gallery_admin_auth', 'true');
          localStorage.setItem('gallery_admin_auth_time', Date.now().toString());
        }
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
      if (typeof window !== "undefined" && typeof localStorage !== "undefined" && typeof localStorage.removeItem === "function") {
        localStorage.removeItem('gallery_admin_auth');
        localStorage.removeItem('gallery_admin_auth_time');
      }
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
      <main className={`min-h-screen flex items-center justify-center ${theme === 'catppuccin' ? 'bg-theme' : 'bg-black'}`}>
        <div className={theme === 'catppuccin' ? 'text-theme' : 'text-white'}>Loading...</div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className={`min-h-screen flex items-center justify-center ${theme === 'catppuccin' ? 'bg-theme' : 'bg-black'}`}>
        <div className={`rounded-xl p-8 w-full max-w-md border ${
          theme === 'catppuccin'
            ? 'bg-gray-900-theme border-gray-700-theme'
            : 'bg-black border-white'
        }`}>
          <h1 className={`text-2xl font-light mb-6 text-center ${theme === 'catppuccin' ? 'text-theme' : 'text-white'}`}>Gallery Admin</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm mb-2 ${theme === 'catppuccin' ? 'text-theme' : 'text-white'}`}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${
                  theme === 'catppuccin'
                    ? 'bg-gray-800-theme border-gray-700-theme text-theme placeholder-gray-400-theme focus:border-mauve'
                    : 'bg-black border-white text-white placeholder-gray-400 focus:border-white'
                }`}
                placeholder="Enter admin password"
                required
              />
            </div>
            {message && (
              <p className={theme === 'catppuccin' ? 'text-red text-sm' : 'text-red-400 text-sm'}>{message}</p>
            )}
            <button
              type="submit"
              className={`w-full px-6 py-3 rounded-lg border transition-colors duration-200 ${
                theme === 'catppuccin'
                  ? 'bg-gray-800-theme hover:bg-gray-700-theme text-theme border-gray-700-theme hover:border-mauve'
                  : 'bg-black hover:bg-gray-900 text-white border-white'
              }`}
            >
              Access Gallery Admin
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen pt-20 pb-12 px-4 ${theme === 'catppuccin' ? 'bg-theme' : 'bg-black'}`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-3xl font-light ${theme === 'catppuccin' ? 'text-theme' : 'text-white'}`}>Gallery Admin</h1>
          <button
            onClick={handleLogout}
            className={`transition-colors ${
              theme === 'catppuccin'
                ? 'text-theme hover:text-gray-300-theme'
                : 'text-white hover:text-gray-300'
            }`}
          >
            Logout
          </button>
        </div>

        <div className={`rounded-xl p-6 border ${
          theme === 'catppuccin'
            ? 'bg-gray-900-theme border-gray-700-theme'
            : 'bg-black border-white'
        }`}>
          <h2 className={`text-xl font-light mb-6 ${theme === 'catppuccin' ? 'text-theme' : 'text-white'}`}>Upload New Photo</h2>

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className={`block text-sm mb-2 ${theme === 'catppuccin' ? 'text-theme' : 'text-white'}`}>Select Photo</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className={`w-full px-4 py-3 rounded-lg border file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:transition-colors ${
                  theme === 'catppuccin'
                    ? 'bg-gray-800-theme border-gray-700-theme text-theme file:bg-mauve file:text-black hover:file:bg-pink'
                    : 'bg-black border-white text-white file:bg-white file:text-black hover:file:bg-gray-200'
                }`}
                required
              />
            </div>

            {preview && (
              <div className="relative">
                <label className={`block text-sm mb-2 ${theme === 'catppuccin' ? 'text-theme' : 'text-white'}`}>Preview</label>
                <img
                  src={preview}
                  alt="Preview"
                  className={`w-full max-w-sm rounded-lg border ${theme === 'catppuccin' ? 'border-gray-700-theme' : 'border-white'}`}
                />
              </div>
            )}

            <div>
              <label className={`block text-sm mb-2 ${theme === 'catppuccin' ? 'text-theme' : 'text-white'}`}>Title (optional)</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${
                  theme === 'catppuccin'
                    ? 'bg-gray-800-theme border-gray-700-theme text-theme placeholder-gray-400-theme focus:border-mauve'
                    : 'bg-black border-white text-white placeholder-gray-400 focus:border-white'
                }`}
                placeholder="Photo title"
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${theme === 'catppuccin' ? 'text-theme' : 'text-white'}`}>Description (optional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none h-24 resize-none transition-colors ${
                  theme === 'catppuccin'
                    ? 'bg-gray-800-theme border-gray-700-theme text-theme placeholder-gray-400-theme focus:border-mauve'
                    : 'bg-black border-white text-white placeholder-gray-400 focus:border-white'
                }`}
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
              className={`w-full px-6 py-3 rounded-lg border transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                theme === 'catppuccin'
                  ? 'bg-gray-800-theme hover:bg-gray-700-theme text-theme border-gray-700-theme hover:border-mauve'
                  : 'bg-black hover:bg-gray-900 text-white border-white'
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </form>
        </div>

        {/* Gallery Management Section */}
        {galleryImages.length > 0 && (
          <div className={`rounded-xl p-6 mt-8 border ${
            theme === 'catppuccin'
              ? 'bg-gray-900-theme border-gray-700-theme'
              : 'bg-black border-white'
          }`}>
            <h2 className={`text-xl font-light mb-6 ${theme === 'catppuccin' ? 'text-theme' : 'text-white'}`}>Manage Gallery Images</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image) => (
                <div key={image.id} className={`rounded-lg p-4 border ${
                  theme === 'catppuccin'
                    ? 'bg-gray-800-theme border-gray-700-theme'
                    : 'bg-black border-white'
                }`}>
                  <img
                    src={image.blobUrl || `/images/gallery/${image.filename}`}
                    alt={image.title || 'Gallery image'}
                    className={`w-full h-32 object-cover rounded mb-3 border ${
                      theme === 'catppuccin' ? 'border-gray-700-theme' : 'border-white'
                    }`}
                  />
                  <div className="space-y-2">
                    <h3 className={`text-sm font-medium ${
                      theme === 'catppuccin' ? 'text-theme' : 'text-white'
                    }`}>
                      {image.title || 'Untitled'}
                    </h3>
                    <p className={`text-xs ${
                      theme === 'catppuccin' ? 'text-gray-400-theme' : 'text-gray-400'
                    }`}>
                      {new Date(image.uploadDate).toLocaleDateString()}
                    </p>
                    {image.description && (
                      <p className={`text-xs line-clamp-2 ${
                        theme === 'catppuccin' ? 'text-gray-300-theme' : 'text-gray-300'
                      }`}>
                        {image.description}
                      </p>
                    )}
                    <button
                      onClick={() => setDeleteConfirmId(image.id)}
                      disabled={deleting === image.id}
                      className={`w-full px-3 py-2 rounded text-xs transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border ${
                        theme === 'catppuccin'
                          ? 'bg-red hover:bg-red text-mantle border-red'
                          : 'bg-red-900 hover:bg-red-800 text-red-300 border-red-700'
                      }`}
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
          <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ${
            theme === 'catppuccin' ? 'bg-gray-900-theme/80' : 'bg-black/80'
          }`}>
            <div className={`rounded-xl p-6 w-full max-w-md mx-4 border ${
              theme === 'catppuccin'
                ? 'bg-gray-900-theme border-gray-700-theme'
                : 'bg-black border-white'
            }`}>
              <h3 className={`text-lg font-light mb-4 ${theme === 'catppuccin' ? 'text-theme' : 'text-white'}`}>Confirm Deletion</h3>
              <p className={`text-sm mb-6 ${
                theme === 'catppuccin' ? 'text-gray-300-theme' : 'text-gray-300'
              }`}>
                Are you sure you want to delete this image? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className={`flex-1 px-4 py-2 rounded transition-colors duration-200 border ${
                    theme === 'catppuccin'
                      ? 'bg-gray-800-theme hover:bg-gray-700-theme text-theme border-gray-700-theme hover:border-mauve'
                      : 'bg-black hover:bg-gray-900 text-white border-white'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  disabled={deleting === deleteConfirmId}
                  className={`flex-1 px-4 py-2 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border ${
                    theme === 'catppuccin'
                      ? 'bg-red hover:bg-red text-mantle border-red'
                      : 'bg-red-900 hover:bg-red-800 text-red-300 border-red-700'
                  }`}
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
            className={`transition-colors ${
              theme === 'catppuccin'
                ? 'text-theme hover:text-gray-300-theme'
                : 'text-white hover:text-gray-300'
            }`}
          >
            ← Back to Gallery
          </a>
        </div>
      </div>
    </main>
  );
}