import React, { useState, useEffect } from 'react';
import { useSchool } from '../context/SchoolContext';

interface SchoolLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'color';
  showText?: boolean;
  customLogoUrl?: string;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'color',
  showText = false,
  customLogoUrl
}) => {
  const { schoolInfo } = useSchool();
  const [imageError, setImageError] = useState(false);

  const activeLogoUrl = customLogoUrl || schoolInfo?.logoUrl;

  useEffect(() => {
    setImageError(false);
  }, [activeLogoUrl]);

  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* If custom logo image is provided and hasn't errored, display it */}
      {activeLogoUrl && !imageError ? (
        <div className={`relative flex-shrink-0 ${sizeMap[size]} transition-transform duration-300 hover:scale-105 rounded-full overflow-hidden border-2 border-amber-400 bg-white shadow-sm flex items-center justify-center p-0.5`}>
          <img
            src={activeLogoUrl}
            alt={schoolInfo?.name || "Logo SD Qur'an Para Sahabat"}
            className="w-full h-full object-contain rounded-full"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        /* SVG Emblem representing SD Qur'an Para Sahabat */
        <div className={`relative flex-shrink-0 ${sizeMap[size]} transition-transform duration-300 hover:scale-105`}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
            {/* Outer Islamic Octagram / Rub El Hizb Petals */}
            <circle cx="50" cy="50" r="47" className={variant === 'light' ? 'fill-emerald-950 stroke-amber-400' : 'fill-emerald-900 stroke-amber-400'} strokeWidth="2.5" />
            <circle cx="50" cy="50" r="42" className="fill-emerald-800/90 stroke-amber-300/60" strokeWidth="1.2" strokeDasharray="3 2" />
            
            {/* Subtle star geometry */}
            <polygon 
              points="50,14 61,28 78,28 70,43 78,58 61,58 50,72 39,58 22,58 30,43 22,28 39,28" 
              className="fill-emerald-700/60 stroke-amber-400/40" 
              strokeWidth="1"
            />

            {/* Open Qur'an Symbol (Al-Qur'an al-Kareem) */}
            {/* Book Base (Rehal) */}
            <path d="M36 68L50 59L64 68L60 72L50 64L40 72Z" className="fill-amber-400" />
            <circle cx="50" cy="62" r="2.5" className="fill-emerald-900" />

            {/* Left Book Page */}
            <path d="M50 56C42 54 32 50 26 42C26 34 32 32 50 36Z" className="fill-amber-50 stroke-amber-200" strokeWidth="0.8" />
            {/* Right Book Page */}
            <path d="M50 56C58 54 68 50 74 42C74 34 68 32 50 36Z" className="fill-white stroke-amber-200" strokeWidth="0.8" />

            {/* Page Lines representing Quranic Verses */}
            <line x1="32" y1="40" x2="45" y2="43" stroke="#064e3b" strokeWidth="1" strokeLinecap="round" />
            <line x1="30" y1="45" x2="46" y2="48" stroke="#064e3b" strokeWidth="1" strokeLinecap="round" />
            <line x1="32" y1="50" x2="44" y2="52" stroke="#064e3b" strokeWidth="1" strokeLinecap="round" />

            <line x1="55" y1="43" x2="68" y2="40" stroke="#064e3b" strokeWidth="1" strokeLinecap="round" />
            <line x1="54" y1="48" x2="70" y2="45" stroke="#064e3b" strokeWidth="1" strokeLinecap="round" />
            <line x1="56" y1="52" x2="68" y2="50" stroke="#064e3b" strokeWidth="1" strokeLinecap="round" />

            {/* Center Quran Spine */}
            <line x1="50" y1="36" x2="50" y2="56" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />

            {/* Light Rays / Nur */}
            <path d="M50 20L50 26" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <path d="M41 23L45 28" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M59 23L55 28" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />

            {/* Golden Crescent & Star */}
            <path 
              d="M50 18 C52 18 53.5 19.5 53.5 21.5 C53.5 23.5 52 25 50 25 C49 25 48.2 24.5 47.7 23.8 C48.8 23.5 49.5 22.5 49.5 21.5 C49.5 20.5 48.8 19.5 47.7 19.2 C48.2 18.5 49 18 50 18 Z" 
              className="fill-amber-300"
            />
            <circle cx="53" cy="20.5" r="0.8" className="fill-amber-200" />
          </svg>
        </div>
      )}

      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-400 leading-tight">
            Sekolah Dasar Berbasis Al-Qur'an
          </span>
          <span className="text-base sm:text-lg font-bold tracking-tight text-emerald-950 font-serif leading-tight">
            SD Qur'an Para Sahabat
          </span>
          <span className="text-[11px] font-medium text-emerald-700 leading-tight">
            Kampung Baru • Muara Tembesi
          </span>
        </div>
      )}
    </div>
  );
};
