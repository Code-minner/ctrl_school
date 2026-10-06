"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type CarouselProps = {
  children: ReactNode[];
  /** Autoplay interval in ms. 0 disables it. */
  autoPlay?: number;
  className?: string;
  ariaLabel: string;
};

export default function Carousel({ children, autoPlay = 4500, className = "", ariaLabel }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = children.length;

  const goTo = useCallback((i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const next = (i + count) % count;
    const slide = el.children[next] as HTMLElement | undefined;
    if (!slide) return;
    el.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setIndex(next);
  }, [count]);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    let closest = 0;
    let min = Infinity;
    slides.forEach((slide, i) => {
      const d = Math.abs(slide.offsetLeft - el.scrollLeft);
      if (d < min) {
        min = d;
        closest = i;
      }
    });
    setIndex(closest);
  };

  useEffect(() => {
    if (!autoPlay || paused || count < 2) return;
    const id = window.setInterval(() => goTo(index + 1), autoPlay);
    return () => window.clearInterval(id);
  }, [autoPlay, paused, index, count, goTo]);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div key={i} data-slide className="min-w-0 shrink-0 snap-start" style={{ width: "min(85%, 28rem)" }}>
            {child}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5842be]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M8.5 3 4.5 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Slides">
            {children.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-brand" : "w-2 bg-brand-lime hover:bg-brand-lime-deep"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5842be]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M5.5 3 9.5 7l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
