import React from 'react';
import GlassCard from '../ui/GlassCard';

interface StatCardProps {
  title: string;
  icon: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
    text: string;
  };
  children?: React.ReactNode; // For extra elements like ProgressBar
}

export default function StatCard({ title, icon, value, trend, children }: StatCardProps) {
  return (
    <GlassCard className="p-6 flex flex-col gap-4 relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors"></div>
      
      <div className="flex justify-between items-center z-10">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{title}</span>
        <span className="material-symbols-outlined text-tertiary-container">{icon}</span>
      </div>
      
      <div className="z-10">
        <span className="font-headline-lg text-headline-lg animated-counter">{value}</span>
      </div>
      
      {trend && (
        <div className="flex items-center gap-2 z-10">
          <span className={`material-symbols-outlined text-[16px] ${trend.isPositive ? 'text-[#22c55e]' : 'text-primary'}`}>
            {trend.isPositive ? 'trending_down' : 'trending_up'} {/* In risk context, down might be good, up bad. Depends on context, let's keep it simple */}
          </span>
          <span className={`font-label-sm text-label-sm ${trend.isPositive ? 'text-[#22c55e]' : 'text-primary'}`}>
            {trend.value} {trend.text}
          </span>
        </div>
      )}

      {children && (
        <div className="z-10 w-full mt-2">
          {children}
        </div>
      )}
    </GlassCard>
  );
}
