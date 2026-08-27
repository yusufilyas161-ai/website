import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Sparkles, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { compressImageFile, formatBytes, CompressionOptions } from '../utils/imageCompressor';
import { SCHOOL_PHOTOS } from '../data/schoolImages';

interface ImageUploaderProps {
  label: string;
  subLabel?: string;
  currentValue?: string;
  onChange: (dataUrlOrUrl: string) => void;
  aspectRatio?: 'square' | 'video' | 'banner' | 'auto';
  compressionOptions?: CompressionOptions;
  showPresets?: boolean;
  presetFilterTag?: string;
  placeholderText?: string;
  required?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  subLabel,
  currentValue = '',
  onChange,
  aspectRatio = 'auto',
  compressionOptions = { maxWidth: 1200, maxHeight: 1200, quality: 0.82 },
  showPresets = true,
  placeholderText = 'Pilih foto dari perangkat atau masukkan tautan URL',
  required = false
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [urlInput, setUrlInput] = useState(currentValue);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionStats, setCompressionStats] = useState<{ original: number; compressed: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const presetPhotos = Object.values(SCHOOL_PHOTOS);

  const handleProcessFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('File yang dipilih harus berupa gambar (JPG, PNG, WebP, dsb).');
      return;
    }

    setIsCompressing(true);
    setErrorMessage(null);
    setCompressionStats(null);

    try {
      const result = await compressImageFile(file, compressionOptions);
      onChange(result.dataUrl);
      setUrlInput(result.dataUrl);
      setCompressionStats({
        original: result.originalSize,
        compressed: result.compressedSize
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memproses gambar. Silakan coba lagi.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
    // reset input value so re-uploading same file triggers change
    if (e.target) e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleApplyUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setCompressionStats(null);
      setErrorMessage(null);
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    setCompressionStats(null);
    setErrorMessage(null);
  };

  const aspectClass = {
    square: 'aspect-square w-32 sm:w-40',
    video: 'aspect-video w-full max-w-sm',
    banner: 'aspect-[21/9] w-full',
    auto: 'h-44 sm:h-52 w-full max-w-md'
  }[aspectRatio];

  return (
    <div className="space-y-3 p-4 bg-slate-900/90 rounded-2xl border border-slate-700">
      {/* Label and tabs header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="block text-xs font-bold text-slate-200">
            {label} {required && <span className="text-red-400">*</span>}
          </label>
          {subLabel && <p className="text-[11px] text-slate-400 mt-0.5">{subLabel}</p>}
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all ${
              activeMode === 'upload' 
                ? 'bg-amber-400 text-emerald-950 shadow-sm' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload HP/PC</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all ${
              activeMode === 'url' 
                ? 'bg-amber-400 text-emerald-950 shadow-sm' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Tautan URL</span>
          </button>

          {showPresets && (
            <button
              type="button"
              onClick={() => setActiveMode('presets')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all ${
                activeMode === 'presets' 
                  ? 'bg-amber-400 text-emerald-950 shadow-sm' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Foto Resmi</span>
            </button>
          )}
        </div>
      </div>

      {/* Main interactive area: Preview + Upload Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        
        {/* Thumbnail Preview */}
        <div className="sm:col-span-5 flex flex-col items-center">
          <div 
            className={`relative rounded-2xl overflow-hidden border-2 bg-slate-950 flex items-center justify-center group ${aspectClass} ${
              currentValue ? 'border-emerald-600' : 'border-dashed border-slate-700'
            }`}
          >
            {currentValue ? (
              <>
                <img 
                  src={currentValue} 
                  alt={label} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // fallback on error
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 opacity-90 transition-opacity"
                  title="Hapus foto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <div className="text-center p-3 text-slate-500 flex flex-col items-center">
                <ImageIcon className="w-8 h-8 mb-1 text-slate-600" />
                <span className="text-[10px]">Belum ada foto</span>
              </div>
            )}

            {isCompressing && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center z-10">
                <Loader2 className="w-6 h-6 text-amber-400 animate-spin mb-1.5" />
                <span className="text-xs text-amber-300 font-bold">Mengompresi Gambar...</span>
                <span className="text-[10px] text-slate-400">Mengoptimalkan ukuran agar ringan</span>
              </div>
            )}
          </div>

          {/* Size Reduction Badge */}
          {compressionStats && (
            <div className="mt-2 text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded-full flex items-center gap-1.5 text-center">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
              <span>
                Dioptimalkan: <s>{formatBytes(compressionStats.original)}</s> → <strong className="text-amber-300">{formatBytes(compressionStats.compressed)}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Input Controls based on Active Mode */}
        <div className="sm:col-span-7 space-y-3">
          
          {/* 1. UPLOAD FROM DEVICE */}
          {activeMode === 'upload' && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`p-4 rounded-2xl border-2 border-dashed text-center transition-all ${
                isDragging 
                  ? 'border-amber-400 bg-amber-400/10 scale-[1.01]' 
                  : 'border-slate-700 bg-slate-800/60 hover:border-slate-500'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                onChange={handleFileChange}
                className="hidden"
              />
              
              <Upload className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-white">
                Klik untuk memilih foto atau seret foto ke sini
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Mendukung foto dari kamera HP, JPG, PNG, atau WebP (otomatis dioptimalkan)
              </p>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isCompressing}
                className="mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 shadow-sm transition-all"
              >
                {isCompressing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Pilih Foto dari Perangkat</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* 2. URL INPUT */}
          {activeMode === 'url' && (
            <form onSubmit={handleApplyUrl} className="space-y-2">
              <label className="block text-[11px] text-slate-300">
                Masukkan URL / Tautan Langsung Foto:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="button"
                  onClick={() => handleApplyUrl()}
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl shadow-sm"
                >
                  Terapkan
                </button>
              </div>
              <p className="text-[10px] text-slate-400">
                Pastikan tautan dapat diakses secara publik (contoh: dari Google Drive, Imgur, Cloudinary).
              </p>
            </form>
          )}

          {/* 3. PRESETS PICKER */}
          {activeMode === 'presets' && (
            <div className="space-y-2">
              <label className="block text-[11px] text-amber-300 font-bold">
                Pilih dari 10 Dokumentasi Foto Resmi SD Qur'an:
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 scrollbar-thin">
                {presetPhotos.map((photo) => {
                  const isSelected = currentValue === photo.url;
                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => {
                        onChange(photo.url);
                        setUrlInput(photo.url);
                        setCompressionStats(null);
                        setErrorMessage(null);
                      }}
                      className={`text-left p-1.5 rounded-xl border flex items-center gap-2 transition-all ${
                        isSelected 
                          ? 'border-amber-400 bg-amber-400/15 ring-1 ring-amber-400' 
                          : 'border-slate-700 bg-slate-800 hover:border-slate-500'
                      }`}
                    >
                      <img src={photo.url} alt={photo.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="block text-[10px] font-bold text-white truncate">{photo.tag}</span>
                        <span className="block text-[9px] text-slate-400 truncate">{photo.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
