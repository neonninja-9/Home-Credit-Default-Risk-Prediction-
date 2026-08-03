import React from 'react';

export default function DonutChart() {
  return (
    <svg className="w-full max-w-[250px] -rotate-90 drop-shadow-[0_0_15px_rgba(219,92,89,0.2)]" viewBox="0 0 100 100">
      {/* Background Circle */}
      <circle cx="50" cy="50" fill="transparent" r="40" stroke="var(--color-surface-container-highest)" strokeWidth="15"></circle>
      {/* Low Risk (65%) */}
      <circle className="donut-segment" cx="50" cy="50" fill="transparent" r="40" stroke="#22c55e" strokeDasharray="251.2" strokeDashoffset="87.92" strokeWidth="15"></circle>
      {/* Medium Risk (24%) starts at 65% */}
      <circle className="donut-segment" cx="50" cy="50" fill="transparent" r="40" stroke="#eab308" strokeDasharray="251.2" strokeDashoffset="190.91" strokeWidth="15" style={{ transform: 'rotate(234deg)', transformOrigin: '50% 50%' }}></circle>
      {/* High Risk (11%) starts at 89% */}
      <circle className="donut-segment" cx="50" cy="50" fill="transparent" r="40" stroke="#db5c59" strokeDasharray="251.2" strokeDashoffset="223.56" strokeWidth="15" style={{ transform: 'rotate(320deg)', transformOrigin: '50% 50%' }}></circle>
    </svg>
  );
}
