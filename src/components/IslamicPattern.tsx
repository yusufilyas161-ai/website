import React from 'react';

interface IslamicPatternProps {
  className?: string;
  opacity?: number;
  variant?: 'stars' | 'moroccan' | 'subtle';
}

export const IslamicPattern: React.FC<IslamicPatternProps> = ({
  className = '',
  opacity = 0.05,
  variant = 'stars'
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} 
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="islamic-star-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* 8-pointed Islamic Star Geometry */}
            <path 
              d="M40 0 L52 28 L80 40 L52 52 L40 80 L28 52 L0 40 L28 28 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.2" 
            />
            <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
            <polygon points="40,24 45,35 56,40 45,45 40,56 35,45 24,40 35,35" fill="none" stroke="currentColor" strokeWidth="0.6" />
            
            {/* Corner interlock accents */}
            <path d="M0 0 L10 10 M80 0 L70 10 M80 80 L70 70 M0 80 L10 70" stroke="currentColor" strokeWidth="1" />
            <circle cx="0" cy="0" r="4" fill="currentColor" />
            <circle cx="80" cy="0" r="4" fill="currentColor" />
            <circle cx="0" cy="80" r="4" fill="currentColor" />
            <circle cx="80" cy="80" r="4" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-star-pattern)" />
      </svg>
    </div>
  );
};
