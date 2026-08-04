"use client";

import { CSSProperties, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type StrokeTextTrigger = 'mount' | 'hover' | 'scroll' | 'loop';
export type StrokeTextFillMode = 'wipe' | 'fade' | 'none';

export interface StrokeTextProps {
  text?: string;
  strokeColor?: string;
  fillColor?: string;
  fillGradient?: { from: string; to: string; via?: string };
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: StrokeTextTrigger;
  fillMode?: StrokeTextFillMode;
  fontSize?: number;
  fontWeight?: number | string;
  fontFamily?: string;
  letterSpacing?: number;
  reverse?: boolean;
  glow?: boolean;
  glowColor?: string;
  className?: string;
  style?: CSSProperties;
}

interface StrokeTextBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const DEFAULT_TEXT = 'Draw Attention';

const StrokeText = ({
  text = DEFAULT_TEXT,
  strokeColor = '#A78BFA',
  fillColor = '#F8FAFC',
  fillGradient,
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = 'power2.out',
  trigger = 'mount',
  fillMode = 'wipe',
  fontSize = 128,
  fontWeight = 800,
  fontFamily = 'var(--font-dm-sans), sans-serif',
  letterSpacing = -4,
  reverse = false,
  glow = false,
  glowColor,
  className = '',
  style = {}
}: StrokeTextProps) => {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const strokeTextRef = useRef<SVGTextElement | null>(null);
  const wipeRectRef = useRef<SVGRectElement | null>(null);

  const [box, setBox] = useState<StrokeTextBox | null>(null);

  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const wipeId = `stroke-text-wipe-${safeId}`;
  const gradientId = `stroke-text-grad-${safeId}`;
  const filterId = `stroke-text-glow-${safeId}`;

  const characters = useMemo(() => Array.from(String(text ?? '')), [text]);

  const dash = Math.max(fontSize * 7, 200);

  const fontStyle = useMemo<CSSProperties>(
    () => ({
      fontFamily,
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`
    }),
    [fontFamily, fontSize, fontWeight, letterSpacing]
  );

  useLayoutEffect(() => {
    const node = strokeTextRef.current;
    if (!node) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled || !strokeTextRef.current) return;
      let bbox: DOMRect | undefined;
      try {
        bbox = strokeTextRef.current.getBBox();
      } catch {
        return;
      }
      if (!bbox || !bbox.width) return;

      // Keep pad minimal to avoid excess empty vertical spacing
      const pad = Math.max(Number(strokeWidth) || 1, 3);
      const next = {
        x: bbox.x - pad,
        y: bbox.y - pad,
        width: bbox.width + pad * 2,
        height: bbox.height + pad * 2
      };

      setBox(prev =>
        prev &&
        Math.abs(prev.x - next.x) < 0.5 &&
        Math.abs(prev.width - next.width) < 0.5 &&
        Math.abs(prev.y - next.y) < 0.5 &&
        Math.abs(prev.height - next.height) < 0.5
          ? prev
          : next
      );
    };

    measure();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [characters, fontSize, fontWeight, letterSpacing, strokeWidth, fontFamily]);

  useEffect(() => {
    const root = rootRef.current;
    if (typeof window === 'undefined' || !root || !box) return undefined;

    const strokes = gsap.utils.toArray(root.querySelectorAll('[data-stroke-char]'));
    const fills = gsap.utils.toArray(root.querySelectorAll('[data-fill-char]'));
    const wipe = wipeRectRef.current;
    if (!strokes.length) return undefined;

    const fillEnabled = fillMode !== 'none';
    const useWipe = fillEnabled && fillMode === 'wipe';
    const fillDuration = Math.max(0.4, drawDuration * 0.5);
    const staggerConfig: number | gsap.StaggerVars = reverse ? { each: stagger, from: 'end' as const } : stagger;
    const targets = [...strokes, ...fills, wipe].filter(Boolean);

    const setStart = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash });
      gsap.set(fills, { opacity: useWipe ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: 0 } });
    };

    const setEnd = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0 });
      gsap.set(fills, { opacity: fillEnabled ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: fillEnabled ? box.width : 0 } });
    };

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setEnd();
      return () => gsap.killTweensOf(targets);
    }

    const build = () => {
      setStart();
      const tl = gsap.timeline({
        paused: true,
        repeat: trigger === 'loop' ? -1 : 0,
        repeatDelay: trigger === 'loop' ? 0.9 : 0,
        defaults: { overwrite: 'auto' }
      });

      tl.to(strokes, { strokeDashoffset: 0, duration: drawDuration, ease, stagger: staggerConfig }, 0);

      if (useWipe && wipe) {
        tl.to(
          wipe,
          { attr: { width: box.width }, duration: fillDuration, ease: 'power2.inOut' },
          drawDuration + fillDelay
        );
      } else if (fillEnabled) {
        tl.to(
          fills,
          { opacity: 1, duration: fillDuration, ease: 'power2.out', stagger: staggerConfig },
          drawDuration + fillDelay
        );
      }

      return tl;
    };

    let timeline: gsap.core.Timeline | null = null;
    let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;
    let removeHover: (() => void) | null = null;

    if (trigger === 'hover') {
      setEnd();
      const play = () => {
        timeline?.kill();
        timeline = build();
        timeline.play(0);
      };
      root.addEventListener('pointerenter', play);
      removeHover = () => root.removeEventListener('pointerenter', play);
    } else {
      timeline = build();
      if (trigger === 'scroll') {
        scrollTrigger = ScrollTrigger.create({
          trigger: root,
          start: 'top 82%',
          once: true,
          onEnter: () => timeline?.play(0)
        });
      } else {
        timeline.play(0);
      }
    }

    return () => {
      removeHover?.();
      scrollTrigger?.kill();
      timeline?.kill();
      gsap.killTweensOf(targets);
    };
  }, [box, dash, drawDuration, fillDelay, stagger, ease, trigger, fillMode, reverse]);

  const viewBox = box ? `${box.x} ${box.y} ${box.width} ${box.height}` : `0 ${-fontSize * 0.9} 600 ${fontSize * 1.05}`;
  const effectiveFill = fillGradient ? `url(#${gradientId})` : fillColor;

  return (
    <span
      ref={rootRef}
      className={`block w-full leading-[0] ${trigger === 'hover' ? 'cursor-pointer' : ''} ${className}`.trim()}
      style={style}
      role="img"
      aria-label={String(text ?? '')}
    >
      <svg
        className="block w-full overflow-visible"
        style={{ height: box ? `${Math.ceil(box.height)}px` : `${Math.round(fontSize * 1.0)}px` }}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {fillMode === 'wipe' && box && (
            <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
              <rect ref={wipeRectRef} x={box.x} y={box.y} width="0" height={box.height} />
            </clipPath>
          )}

          {fillGradient && (
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fillGradient.from} />
              {fillGradient.via && <stop offset="50%" stopColor={fillGradient.via} />}
              <stop offset="100%" stopColor={fillGradient.to} />
            </linearGradient>
          )}

          {glow && (
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor={glowColor || strokeColor} floodOpacity="0.5" />
              <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor={glowColor || strokeColor} floodOpacity="0.25" />
            </filter>
          )}
        </defs>

        {/* Outline Stroke Text */}
        <text
          ref={strokeTextRef}
          className="select-none"
          x="0"
          y="0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          filter={glow ? `url(#${filterId})` : undefined}
          style={fontStyle}
        >
          {characters.map((char, index) => (
            <tspan data-stroke-char key={`s-${index}`}>
              {char}
            </tspan>
          ))}
        </text>

        {/* Filled Text with optional Gradient & Wipe Reveal */}
        <text
          className="select-none"
          x="0"
          y="0"
          fill={effectiveFill}
          stroke="none"
          style={fontStyle}
          clipPath={fillMode === 'wipe' && box ? `url(#${wipeId})` : undefined}
        >
          {characters.map((char, index) => (
            <tspan data-fill-char key={`f-${index}`}>
              {char}
            </tspan>
          ))}
        </text>
      </svg>
    </span>
  );
};

export default StrokeText;
