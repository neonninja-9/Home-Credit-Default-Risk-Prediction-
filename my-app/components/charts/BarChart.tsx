import React from 'react';

export interface FeatureImportance {
  label: string;
  value: number; // positive or negative
}

interface BarChartProps {
  data: FeatureImportance[];
}

export default function BarChart({ data }: BarChartProps) {
  // Find max absolute value to scale bars properly
  const maxAbs = Math.max(...data.map(d => Math.abs(d.value)), 1);

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* Center Line Header */}
      <div className="relative flex items-center mb-2">
        <div className="w-1/3"></div>
        <div className="w-2/3 flex justify-between font-label-sm text-label-sm text-on-surface-variant px-2">
          <span>Decreases Risk</span>
          <span>Increases Risk</span>
        </div>
      </div>

      {data.map((item, index) => {
        const isPositive = item.value > 0;
        const widthPercent = (Math.abs(item.value) / maxAbs) * 50; // max 50% width from center

        return (
          <div key={index} className="relative flex items-center">
            <div className="w-1/3 text-right pr-4 font-label-md text-label-md text-on-surface truncate">
              {item.label}
            </div>
            <div className="w-2/3 flex items-center relative h-6">
              {/* Center Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-glass-stroke z-0"></div>
              
              {isPositive ? (
                /* Positive Bar (Red) */
                <div 
                  className="absolute left-1/2 h-full bg-error/20 border border-error/40 rounded-r flex items-center justify-start pl-2 z-10"
                  style={{ width: `${widthPercent}%` }}
                >
                  <span className="font-label-sm text-label-sm text-error">+{item.value.toFixed(2)}</span>
                </div>
              ) : (
                /* Negative Bar (Green) */
                <div 
                  className="absolute right-1/2 h-full bg-[#22c55e]/20 border border-[#22c55e]/40 rounded-l flex items-center justify-end pr-2 z-10"
                  style={{ width: `${widthPercent}%` }}
                >
                  <span className="font-label-sm text-label-sm text-[#22c55e]">{item.value.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
