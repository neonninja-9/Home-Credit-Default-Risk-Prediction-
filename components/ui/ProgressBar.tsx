import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string; // e.g. '#db5c59' or 'bg-primary'
  className?: string;
}

export default function ProgressBar({ progress, color = '#db5c59', className = '' }: ProgressBarProps) {
  // Check if color is a hex/rgb code or a tailwind class
  const isHex = color.startsWith('#') || color.startsWith('rgb');
  const colorClass = isHex ? '' : color;
  const inlineStyle = isHex ? { backgroundColor: color, width: `${progress}%` } : { width: `${progress}%` };

  return (
    <div className={`w-full bg-surface-container-highest rounded-full h-1.5 ${className}`}>
      <div 
        className={`h-1.5 rounded-full ${colorClass}`} 
        style={inlineStyle}
      />
    </div>
  );
}
