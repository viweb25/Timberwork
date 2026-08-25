"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import type { SiteConfig } from "@/types";
import { StatIcon } from "@/components/ui/StatIcon";

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 300;
const SCROLL_HEIGHT_VH = 400; // 400vh total scroll height
const MIN_LOADED_TO_START = 30; // show canvas once this many frames are decoded

function getFrameUrls(): string[] {
  return Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const num = String(i + 1).padStart(3, "0");
    return `/img1/ezgif-frame-${num}.jpg`;
  });
}

interface HeroSectionProps {
  config: SiteConfig;
}

export function HeroSection({ config }: HeroSectionProps) {
  const { hero, stats } = config;

  // ── Refs (no re-renders on scroll) ───────────────────────────────────────
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const frameIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const loadedCountRef = useRef(0);
  const isDirtyRef = useRef(false);
  const dprRef = useRef(1);

  // ── State (minimal — UI only) ─────────────────────────────────────────────
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showFinalOverlay, setShowFinalOverlay] = useState(false);

  // Typing animation state
  const [isClient, setIsClient] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  const fullText = hero.headline;
  const fullWords = hero.headline.split(" ");
  const baseHeadline = fullWords.slice(0, -1).join(" ");
  const lastWord = fullWords[fullWords.length - 1];

  let displayBase = "";
  let displayLast = "";
  if (displayText.length <= baseHeadline.length) {
    displayBase = displayText;
  } else {
    displayBase = baseHeadline;
    displayLast = displayText.substring(baseHeadline.length + 1);
  }

  // ── Typing animation ──────────────────────────────────────────────────────
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    if (isTyping && currentIndex < fullText.length) {
      const t = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(t);
    } else if (currentIndex >= fullText.length) {
      setIsTyping(false);
      const sd = setTimeout(() => setShowDescription(true), 500);
      const rs = setTimeout(() => {
        setShowDescription(false);
        setDisplayText("");
        setCurrentIndex(0);
        setIsTyping(true);
      }, 10000);
      return () => { clearTimeout(sd); clearTimeout(rs); };
    }
  }, [currentIndex, fullText, isTyping, isClient]);

  // ── Canvas draw (cover-fit, DPR-aware) ───────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = dprRef.current;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;

    ctx.clearRect(0, 0, W, H);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = W / H;
    let dW: number, dH: number, dX: number, dY: number;
    if (imgRatio > canvasRatio) {
      dH = H; dW = dH * imgRatio;
      dX = (W - dW) / 2; dY = 0;
    } else {
      dW = W; dH = dW / imgRatio;
      dX = 0; dY = (H - dH) / 2;
    }
    ctx.drawImage(img, dX, dY, dW, dH);
  }, []);

  // ── Canvas resize (DPR-aware) ─────────────────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;
    
    // Use the exact dimensions of the parent container
    const w = parent.clientWidth;
    const h = parent.clientHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // reset transform before scaling to prevent compounding if resize is called multiple times without width/height reset (though setting width/height does reset it)
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    drawFrame(frameIndexRef.current);
  }, [drawFrame]);

  // ── rAF-throttled scroll handler ─────────────────────────────────────────
  const handleScroll = useCallback(() => {
    if (isDirtyRef.current) return;
    isDirtyRef.current = true;
    rafRef.current = requestAnimationFrame(() => {
      isDirtyRef.current = false;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const viewH = window.innerHeight;
      const scrolled = -rect.top;
      const scrollable = sectionH - viewH;
      const progress = Math.min(Math.max(scrolled / scrollable, 0), 1);

      const newFrame = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
      const atEnd = progress >= 0.97;
      setShowFinalOverlay(atEnd);

      if (newFrame !== frameIndexRef.current) {
        frameIndexRef.current = newFrame;
        drawFrame(newFrame);
      }
    });
  }, [drawFrame]);

  // ── Preload all 300 images ────────────────────────────────────────────────
  useEffect(() => {
    const urls = getFrameUrls();
    let mounted = true;
    urls.forEach((url, i) => {
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        if (!mounted) return;
        imagesRef.current[i] = img;
        loadedCountRef.current += 1;
        setLoadedCount(loadedCountRef.current);
        if (i === 0) drawFrame(0);
        if (loadedCountRef.current >= MIN_LOADED_TO_START) setIsReady(true);
      };
      img.onerror = () => {
        if (!mounted) return;
        loadedCountRef.current += 1;
        setLoadedCount(loadedCountRef.current);
      };
    });
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Wire up listeners once ready ──────────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;
    resizeCanvas();
    drawFrame(0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReady, resizeCanvas, handleScroll, drawFrame]);

  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative bg-brand-dark"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    >
      {/* Sticky wrapper — pins canvas in viewport while section scrolls */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* Static fallback first frame (always present behind canvas) */}
        <div className="absolute inset-0 z-0 bg-brand-dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img1/ezgif-frame-001.jpg"
            alt="Timberpark construction project"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.6s ease" }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/40 via-brand-dark/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
        </div>

        {/* ── Initial hero text (typing animation) — fades out at end ── */}
        <div
          className="absolute inset-0 z-20 hidden md:flex flex-col"
          style={{
            opacity: showFinalOverlay ? 0 : 1,
            transition: "opacity 0.5s ease",
            pointerEvents: showFinalOverlay ? "none" : "auto",
          }}
        >
          <div className="flex-1 flex items-center">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col justify-center space-y-6 items-start max-w-2xl text-left">
                <div className="space-y-6">
                  {/* Eyebrow */}
                  <div className={`flex items-center gap-3 transition-all duration-1000 ${showDescription ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    <span className="block w-8 h-0.5 bg-brand-wood" />
                    <p className="text-brand-woodLight text-xs sm:text-sm font-semibold tracking-wider uppercase">{hero.eyebrow}</p>
                  </div>
                  {/* Headline */}
                  <h1 className="text-fluid-hero font-semibold lg:font-bold text-white tracking-[-0.035em] leading-[1.08] drop-shadow-lg" style={{ textShadow: "2px 2px 2px rgba(0,0,0,0.8)" }}>
                    {isClient ? (
                      <>
                        {displayBase}
                        {displayText.length > baseHeadline.length && <br />}
                        <span className="text-brand-wood">{displayLast}</span>
                      </>
                    ) : (
                      <>
                        {baseHeadline}<br />
                        <span className="text-brand-wood">{lastWord}</span>
                      </>
                    )}
                  </h1>
                  {/* Sub + description */}
                  <div className={`transition-all duration-1000 ${showDescription ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    <p className="text-white/80 text-sm md:text-base font-semibold tracking-[0.05em] mb-6">{hero.subheadline}</p>
                    <p className="max-w-[600px] text-white/70 text-base md:text-lg font-normal leading-relaxed tracking-tight border-l-4 border-brand-wood pl-4 hover:border-brand-woodLight transition-all duration-1000">{hero.description}</p>
                  </div>
                </div>
                {/* CTAs */}
                <div className={`flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-start w-full sm:w-auto max-w-md sm:max-w-none transition-all duration-1000 ${showDescription ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                  <Button href={hero.ctaPrimary.href} variant="primary" size="lg" arrow id="hero-cta-primary" className="w-full sm:w-auto justify-center rounded-xl font-semibold tracking-tight py-3.5 sm:py-4 px-7 text-sm sm:text-base shadow-[0_10px_25px_-5px_rgba(197,138,78,0.45)] hover:shadow-[0_15px_30px_-5px_rgba(197,138,78,0.6)] active:scale-[0.98] transition-all">{hero.ctaPrimary.label}</Button>
                  <Button href={hero.ctaSecondary.href} variant="secondary" size="lg" arrow id="hero-cta-secondary" className="w-full sm:w-auto justify-center rounded-xl font-semibold tracking-tight py-3.5 sm:py-4 px-7 text-sm sm:text-base bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-brand-dark active:scale-[0.98] transition-all">{hero.ctaSecondary.label}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Final overlay — word-by-word animation when last frame reached ── */}
        <div
          className="absolute inset-0 z-20 flex flex-col"
          style={{
            opacity: showFinalOverlay ? 1 : 0,
            transition: "opacity 0.7s ease",
            pointerEvents: showFinalOverlay ? "auto" : "none",
          }}
        >
          {/* Stronger gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/50 via-brand-dark/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent pointer-events-none" />

          <div className="flex-1 flex items-center relative z-10">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col justify-center space-y-6 items-start max-w-2xl text-left">
                <div className="space-y-6">
                  {/* Eyebrow slide in */}
                  <div className="flex items-center gap-3" style={{ animation: showFinalOverlay ? "heroSlideInLeft 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both" : "none" }}>
                    <span className="block w-8 h-0.5 bg-brand-wood" />
                    <p className="text-brand-woodLight text-xs sm:text-sm font-semibold tracking-wider uppercase">{hero.eyebrow}</p>
                  </div>
                  {/* Headline */}
                  <h1 className="text-fluid-hero font-semibold lg:font-bold text-white tracking-[-0.035em] leading-[1.08] drop-shadow-lg" style={{ textShadow: "2px 2px 2px rgba(0,0,0,0.8)" }}>
                    {isClient ? (
                      <>
                        {displayBase}
                        {displayText.length > baseHeadline.length && <br />}
                        <span className="text-brand-wood">{displayLast}</span>
                      </>
                    ) : (
                      <>
                        {baseHeadline}<br />
                        <span className="text-brand-wood">{lastWord}</span>
                      </>
                    )}
                  </h1>
                  {/* Description fade up */}
                  <div style={{ animation: showFinalOverlay ? "heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both" : "none" }}>
                    <p className="text-white/80 text-sm md:text-base font-semibold tracking-[0.05em] mb-6">{hero.subheadline}</p>
                    <p className="max-w-[600px] text-white/70 text-base md:text-lg font-normal leading-relaxed tracking-tight border-l-4 border-brand-wood pl-4">{hero.description}</p>
                  </div>
                </div>
                {/* CTAs fade up */}
                <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-start w-full sm:w-auto max-w-md sm:max-w-none" style={{ animation: showFinalOverlay ? "heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.85s both" : "none" }}>
                  <Button href={hero.ctaPrimary.href} variant="primary" size="lg" arrow id="hero-final-cta-primary" className="w-full sm:w-auto justify-center rounded-xl font-semibold tracking-tight py-3.5 sm:py-4 px-7 text-sm sm:text-base shadow-[0_10px_25px_-5px_rgba(197,138,78,0.45)] hover:shadow-[0_15px_30px_-5px_rgba(197,138,78,0.6)] active:scale-[0.98] transition-all">{hero.ctaPrimary.label}</Button>
                  <Button href={hero.ctaSecondary.href} variant="secondary" size="lg" arrow id="hero-final-cta-secondary" className="w-full sm:w-auto justify-center rounded-xl font-semibold tracking-tight py-3.5 sm:py-4 px-7 text-sm sm:text-base bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-brand-dark active:scale-[0.98] transition-all">{hero.ctaSecondary.label}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        {/* <div className="absolute -bottom-4 left-0 right-0 z-30 bg-black/80 backdrop-blur-sm border-t border-white/10 hover:translate-y-0 transition-transform duration-300">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/15">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-4 lg:px-6 xl:px-8 justify-start">
                  <div className="flex-shrink-0"><StatIcon index={i} /></div>
                  <div className="flex flex-col justify-center text-left flex-1 min-w-0">
                    <p className="text-left text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-[-0.03em] leading-none mb-1">{stat.value}</p>
                    <p className="text-left text-white/70 text-xs tracking-tight font-medium leading-snug">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Scroll hint */}
        <div
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: showFinalOverlay ? 0 : isReady ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          <p className="text-white/40 text-xs tracking-widest uppercase">Scroll</p>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes heroSlideInLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroWordReveal {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}