"use client";

import React, { useRef, useState, useEffect, ReactNode, cloneElement, isValidElement, createContext, TouchEvent, WheelEvent } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue, useMotionValue, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { useScrollExpandStore } from '@/hooks/useScrollExpandStore';

export const ScrollProgressContext = createContext<MotionValue<number> | null>(null);

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image' | 'custom';
  mediaSrc?: string;
  customMedia?: ReactNode;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc = '',
  customMedia,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const {
    scrollProgress,
    showContent,
    mediaFullyExpanded,
    touchStartY,
    isMobileState,
    setScrollProgress,
    setShowContent,
    setMediaFullyExpanded,
    setTouchStartY,
    setIsMobileState,
    reset
  } = useScrollExpandStore();

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    reset();
  }, [mediaType, reset]);

  useEffect(() => {
    const handleWheel = (e: globalThis.WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        // Increase sensitivity for mobile, especially when scrolling back
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005; // Higher sensitivity for scrolling back
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, setMediaFullyExpanded, setScrollProgress, setShowContent, setTouchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, [setIsMobileState]);

  const progress = useMotionValue(0);
  useEffect(() => {
    progress.set(scrollProgress);
  }, [scrollProgress, progress]);

  const smoothProgress = useSpring(progress, { damping: 40, stiffness: 60, mass: 1.5, restDelta: 0.001 });

  const mediaWidth = useTransform(smoothProgress, [0, 1], [300, 300 + (isMobileState ? 650 : 1250)]);
  const mediaHeight = useTransform(smoothProgress, [0, 1], [400, 400 + (isMobileState ? 200 : 400)]);
  const negTextTranslateX = useTransform(smoothProgress, [0, 1], ["0vw", isMobileState ? "-180vw" : "-150vw"]);
  const posTextTranslateX = useTransform(smoothProgress, [0, 1], ["0vw", isMobileState ? "180vw" : "150vw"]);

  const videoRef = useRef<HTMLVideoElement>(null);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (videoRef.current && videoRef.current.duration) {
      // Ensure video is paused so it doesn't fight our scrubbing
      if (!videoRef.current.paused) {
        videoRef.current.pause();
      }
      
      // Sync strictly to animation frames to prevent dropping frames
      requestAnimationFrame(() => {
        if (videoRef.current && videoRef.current.readyState >= 2) {
          videoRef.current.currentTime = latest * videoRef.current.duration * 0.999;
        }
      });
    }
  });

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt='Background'
              width={1920}
              height={1080}
              className='w-screen h-screen'
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              priority
            />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <motion.div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl'
                style={{
                  width: mediaWidth,
                  height: mediaHeight,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'custom' && customMedia ? (
                  <ScrollProgressContext.Provider value={smoothProgress}>
                    {customMedia}
                  </ScrollProgressContext.Provider>
                ) : mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                            (mediaSrc.includes('?') ? '&' : '?') +
                            'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                            '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                            mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full rounded-xl'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        ref={videoRef}
                        src={mediaSrc}
                        poster={posterSrc}
                        muted
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover rounded-xl'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className='w-full h-full object-cover rounded-xl'
                    />

                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                  {date && (
                    <motion.p
                      className='text-2xl text-bone/60 font-medium tracking-widest uppercase'
                      style={{ x: negTextTranslateX }}
                    >
                      {date}
                    </motion.p>
                  )}
                  {scrollToExpand && (
                    <motion.p
                      className='text-bone/40 font-medium text-center text-sm tracking-wider'
                      style={{ x: posTextTranslateX }}
                    >
                      {scrollToExpand}
                    </motion.p>
                  )}
                </div>
              </motion.div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                  }`}
              >
                <motion.h1
                  className='text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter bg-gradient-to-b from-bone via-bone/90 to-dusk-violet/60 bg-clip-text text-transparent transition-none drop-shadow-[0_0_40px_rgba(107,98,242,0.15)]'
                  style={{ x: negTextTranslateX }}
                >
                  {firstWord}
                </motion.h1>
                <motion.h1
                  className='text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter text-center bg-gradient-to-b from-bone via-bone/90 to-dusk-violet/60 bg-clip-text text-transparent transition-none drop-shadow-[0_0_40px_rgba(107,98,242,0.15)]'
                  style={{ x: posTextTranslateX }}
                >
                  {restOfTitle}
                </motion.h1>
              </div>
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
