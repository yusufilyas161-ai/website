import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const LightboxModal: React.FC = () => {
  const { lightboxImage, setLightboxImage } = useSchool();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
      }
    };
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage, setLightboxImage]);

  if (!lightboxImage) return null;

  return (
    <div 
      id="lightbox-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={() => setLightboxImage(null)}
    >
      <div 
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        <button
          id="lightbox-close-button"
          onClick={() => setLightboxImage(null)}
          aria-label="Tutup gambar"
          className="absolute -top-12 right-0 sm:right-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-emerald-950 border border-emerald-800/40">
          <img
            src={lightboxImage.url}
            alt={lightboxImage.alt || lightboxImage.title}
            className="w-auto max-h-[75vh] object-contain rounded-xl"
            loading="eager"
          />
        </div>

        <div className="mt-4 text-center px-4">
          <h4 className="text-white font-medium text-lg">{lightboxImage.title}</h4>
          {lightboxImage.alt && lightboxImage.alt !== lightboxImage.title && (
            <p className="text-emerald-300/80 text-sm mt-1">{lightboxImage.alt}</p>
          )}
        </div>
      </div>
    </div>
  );
};
