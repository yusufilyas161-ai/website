/**
 * Image compressor and optimizer utility using browser Canvas.
 * Solves LocalStorage quota limits and enables instant uploads on mobile/desktop.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  mimeType?: 'image/jpeg' | 'image/png' | 'image/webp';
}

export interface CompressionResult {
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
  format: string;
}

export const formatBytes = (bytes: number, decimals = 1): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const compressImageFile = (
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> => {
  return new Promise((resolve, reject) => {
    // If SVG, return as dataURL directly
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        resolve({
          dataUrl,
          originalSize: file.size,
          compressedSize: file.size,
          width: 200,
          height: 200,
          format: 'svg'
        });
      };
      reader.onerror = () => reject(new Error('Gagal membaca file SVG'));
      reader.readAsDataURL(file);
      return;
    }

    const {
      maxWidth = 1280,
      maxHeight = 1280,
      quality = 0.82,
      mimeType = file.type === 'image/png' && file.size < 500000 ? 'image/png' : 'image/jpeg'
    } = options;

    const originalSize = file.size;
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions preserving aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Browser canvas tidak didukung.'));
          return;
        }

        // Fill background with white if converting PNG/transparent to JPEG
        if (mimeType === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }

        // Draw image with smooth filtering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL(mimeType, quality);
        
        // Approximate base64 string size in bytes
        const head = `data:${mimeType};base64,`;
        const base64Length = dataUrl.length - head.length;
        const compressedSize = Math.round((base64Length * 3) / 4);

        resolve({
          dataUrl,
          originalSize,
          compressedSize,
          width,
          height,
          format: mimeType
        });
      };

      img.onerror = () => {
        reject(new Error('Format gambar tidak valid atau file rusak.'));
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Gagal membaca file dari perangkat.'));
    };

    reader.readAsDataURL(file);
  });
};
