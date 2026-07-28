import React from 'react';

export default function LineChart() {
  return (
    <svg className="w-full h-full preserve-aspect-ratio-none overflow-visible" viewBox="0 0 1000 300">
      {/* Grid Lines */}
      <line stroke="var(--color-glass-stroke)" strokeDasharray="5,5" strokeWidth="1" x1="0" x2="1000" y1="50" y2="50"></line>
      <line stroke="var(--color-glass-stroke)" strokeDasharray="5,5" strokeWidth="1" x1="0" x2="1000" y1="150" y2="150"></line>
      <line stroke="var(--color-glass-stroke)" strokeDasharray="5,5" strokeWidth="1" x1="0" x2="1000" y1="250" y2="250"></line>
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="lineGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#db5c59" stopOpacity="0.3"></stop>
          <stop offset="100%" stopColor="#db5c59" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
      
      {/* Area Fill */}
      <path d="M0,250 L0,200 L100,180 L200,220 L300,150 L400,170 L500,90 L600,120 L700,60 L800,100 L900,40 L1000,70 L1000,250 Z" fill="url(#lineGrad)"></path>
      
      {/* Line Path */}
      <path d="M0,200 L100,180 L200,220 L300,150 L400,170 L500,90 L600,120 L700,60 L800,100 L900,40 L1000,70" fill="none" stroke="#db5c59" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" style={{ filter: 'drop-shadow(0px 4px 6px rgba(219, 92, 89, 0.4))' }}></path>
      
      {/* Data Points */}
      <circle cx="500" cy="90" fill="#131317" r="6" stroke="#db5c59" strokeWidth="3"></circle>
      <circle cx="700" cy="60" fill="#131317" r="6" stroke="#db5c59" strokeWidth="3"></circle>
      <circle cx="900" cy="40" fill="#131317" r="8" stroke="#db5c59" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 8px #db5c59)' }}></circle>
    </svg>
  );
}
