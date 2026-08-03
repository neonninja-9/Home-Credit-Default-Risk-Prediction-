"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StickyTextRevealProps {
  text: string;
  className?: string;
}

function Word({ children, progress, start, end }: { children: string, progress: any, start: number, end: number }) {
  const opacity = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const y = useTransform(progress, [start, end], [40, 0], { clamp: true });

  return (
    <motion.span
      style={{ opacity, y, willChange: 'opacity, transform' }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

export default function StickyTextReveal({ text, className = '' }: StickyTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const words = text.split(/\s+/).filter(w => w.length > 0);

  return (
    <section ref={containerRef} className="w-full relative bg-canvas-dark z-10" style={{ height: `${(words.length + 1) * 50}vh` }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6">
        <h2 className={`inline-block text-center ${className}`}>
          {words.map((word, i) => {
            // Create a smooth, overlapping stagger effect
            const stagger = 0.15;
            const duration = 0.4;
            const start = i * stagger;
            const end = start + duration;
            
            return (
              <React.Fragment key={i}>
                <Word progress={scrollYProgress} start={start} end={end}>
                  {word}
                </Word>
                {i < words.length - 1 && ' '}
              </React.Fragment>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
