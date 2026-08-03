"use client";

import React, { useContext } from 'react';
import * as framerMotion from 'framer-motion';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { ScrollProgressContext } from './scroll-expansion-hero';
const Card = ({ style, title, color }: any) => (
  <motion.div
    style={{
      ...style,
      transformStyle: "preserve-3d",
    }}
    className={`absolute inset-0 m-auto w-full max-w-[340px] aspect-[1.586] rounded-2xl border border-white/10 backdrop-blur-xl flex flex-col justify-between p-6 shadow-2xl ${color}`}
  >
    {/* Glossy overlay */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
    
    {/* Shine effect */}
    <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none" />

    {/* Header / Logo */}
    <div className="flex justify-between items-start relative z-10">
      <h3 className="font-display text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
        CreditLens <span className="font-light text-white/40 block text-xs tracking-[0.3em] uppercase mt-1">{title}</span>
      </h3>
      <svg className="w-10 h-10 text-white/50" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Abstract Chip Icon */}
        <rect x="4" y="4" width="28" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 4V20M18 4V20M26 4V20M4 12H32" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      </svg>
    </div>

    {/* Card Details */}
    <div className="flex flex-col gap-5 relative z-10">
      <div className="flex items-center gap-5">
        <div className="flex gap-1.5">
           <div className="w-2 h-2 rounded-full bg-white/40" />
           <div className="w-2 h-2 rounded-full bg-white/40" />
           <div className="w-2 h-2 rounded-full bg-white/40" />
           <div className="w-2 h-2 rounded-full bg-white/40" />
        </div>
        <div className="flex gap-1.5">
           <div className="w-2 h-2 rounded-full bg-white/40" />
           <div className="w-2 h-2 rounded-full bg-white/40" />
           <div className="w-2 h-2 rounded-full bg-white/40" />
           <div className="w-2 h-2 rounded-full bg-white/40" />
        </div>
        <div className="flex gap-1.5">
           <div className="w-2 h-2 rounded-full bg-white/40" />
           <div className="w-2 h-2 rounded-full bg-white/40" />
           <div className="w-2 h-2 rounded-full bg-white/40" />
           <div className="w-2 h-2 rounded-full bg-white/40" />
        </div>
        <span className="text-white/90 font-mono tracking-widest text-lg ml-2">4920</span>
      </div>
      <div className="flex justify-between items-end text-sm text-white/50 uppercase tracking-widest">
         <div>
           <span className="block text-[9px] mb-1 opacity-70">Card Holder</span>
           <span className="text-white/90 text-xs">Premium Member</span>
         </div>
         <div className="text-right">
           <span className="block text-[9px] mb-1 opacity-70">Valid Thru</span>
           <span className="text-white/90 text-xs">12/28</span>
         </div>
      </div>
    </div>
  </motion.div>
);

export default function AnimatedCreditCards() {
  const contextProgress = useContext(ScrollProgressContext);
  const fallbackProgress = framerMotion.useMotionValue(0);
  const progress = contextProgress || fallbackProgress;

  // Transforms for Card 1 (Back)
  const y1 = useTransform(progress, [0, 1], [0, -140]);
  const x1 = useTransform(progress, [0, 1], [0, -80]);
  const rotateZ1 = useTransform(progress, [0, 1], [0, -15]);
  const rotateX1 = useTransform(progress, [0, 1], [25, 10]);
  const scale1 = useTransform(progress, [0, 1], [0.8, 0.85]);
  const opacity1 = useTransform(progress, [0, 0.25], [0, 1]);

  // Transforms for Card 2 (Middle)
  const y2 = useTransform(progress, [0, 1], [0, -60]);
  const x2 = useTransform(progress, [0, 1], [0, -30]);
  const rotateZ2 = useTransform(progress, [0, 1], [0, -5]);
  const rotateX2 = useTransform(progress, [0, 1], [20, 10]);
  const scale2 = useTransform(progress, [0, 1], [0.9, 0.95]);
  const opacity2 = useTransform(progress, [0, 0.25], [0, 1]);

  // Transforms for Card 3 (Front)
  const y3 = useTransform(progress, [0, 1], [0, 20]);
  const x3 = useTransform(progress, [0, 1], [0, 20]);
  const rotateZ3 = useTransform(progress, [0, 1], [0, 5]);
  const rotateX3 = useTransform(progress, [0, 1], [15, 10]);
  const scale3 = useTransform(progress, [0, 1], [1, 1.05]);
  const opacity3 = useTransform(progress, [0, 0.25], [0, 1]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none" style={{ perspective: "1200px" }}>
      <Card 
        style={{ y: y1, x: x1, rotateZ: rotateZ1, rotateX: rotateX1, scale: scale1, opacity: opacity1 }} 
        title="Black Edition" 
        color="bg-gradient-to-br from-neutral-900 to-black border-neutral-700/50 shadow-black/80" 
      />
      <Card 
        style={{ y: y2, x: x2, rotateZ: rotateZ2, rotateX: rotateX2, scale: scale2, opacity: opacity2 }} 
        title="Platinum Plus" 
        color="bg-gradient-to-br from-slate-800 to-slate-950 border-slate-600/50 shadow-slate-900/80" 
      />
      <Card 
        style={{ y: y3, x: x3, rotateZ: rotateZ3, rotateX: rotateX3, scale: scale3, opacity: opacity3 }} 
        title="Signature Elite" 
        color="bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] border-blue-500/40 shadow-blue-900/50 ring-1 ring-white/10" 
      />
    </div>
  );
}
