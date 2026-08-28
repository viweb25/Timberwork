"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { SiteConfig } from "@/types";

interface HeroSectionProps {
  config: SiteConfig;
}

export function HeroSection({ config }: HeroSectionProps) {
  const { hero } = config;

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

  return (
    <section
      id="hero"
      className="relative bg-brand-dark h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-brand-dark">
        <Image
          src="https://res.cloudinary.com/defqgygsf/image/upload/v1787898703/342_fvdig0.png"
          alt="Timberpark construction project"
          fill
          priority
          quality={90}
          className="object-cover"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/50 via-brand-dark/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent" />
      </div>

      {/* ── Hero text (typing animation) ── */}
      <div className="absolute inset-0 z-20 flex flex-col">
        <div className="flex-1 flex items-center relative z-10">
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
    </section>
  );
}