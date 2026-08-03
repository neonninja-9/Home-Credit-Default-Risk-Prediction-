import { create } from 'zustand';

interface ScrollExpandState {
  scrollProgress: number;
  showContent: boolean;
  mediaFullyExpanded: boolean;
  touchStartY: number;
  isMobileState: boolean;
  setScrollProgress: (progress: number) => void;
  setShowContent: (show: boolean) => void;
  setMediaFullyExpanded: (expanded: boolean) => void;
  setTouchStartY: (y: number) => void;
  setIsMobileState: (isMobile: boolean) => void;
  reset: () => void;
}

export const useScrollExpandStore = create<ScrollExpandState>((set) => ({
  scrollProgress: 0,
  showContent: false,
  mediaFullyExpanded: false,
  touchStartY: 0,
  isMobileState: false,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setShowContent: (show) => set({ showContent: show }),
  setMediaFullyExpanded: (expanded) => set({ mediaFullyExpanded: expanded }),
  setTouchStartY: (y) => set({ touchStartY: y }),
  setIsMobileState: (isMobile) => set({ isMobileState: isMobile }),
  reset: () => set({ scrollProgress: 0, showContent: false, mediaFullyExpanded: false, touchStartY: 0 })
}));
