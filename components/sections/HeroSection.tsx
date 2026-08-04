"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { SiteConfig } from "@/types";
import { StatIcon } from "@/components/ui/StatIcon";

interface HeroSectionProps {
  config: SiteConfig;
}

export function HeroSection({ config }: HeroSectionProps) {
  const { hero, stats } = config;

  const [isClient, setIsClient] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const fullText = hero.headline;

  // Mount & scroll effect
  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (isTyping && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80); // Typing speed
      return () => clearTimeout(timeout);
    } else if (currentIndex >= fullText.length) {
      // Finished typing, show description after a short delay
      setIsTyping(false);
      const showDescTimeout = setTimeout(() => {
        setShowDescription(true);
      }, 500); // Wait 500ms before showing description
      
      // Wait 10 seconds then restart
      const restartTimeout = setTimeout(() => {
        setShowDescription(false);
        setDisplayText("");
        setCurrentIndex(0);
        setIsTyping(true);
      }, 10000); // Wait 10 seconds before restarting
      
      return () => {
        clearTimeout(showDescTimeout);
        clearTimeout(restartTimeout);
      };
    }
  }, [currentIndex, fullText, isTyping]);

  // Split logic to restore original layout with the line break and highlighted last word
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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col bg-brand-dark overflow-hidden"
    >
      {/* Background hero image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Modern construction and renovation project by Timberpark Pte. Ltd."
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay gradient: left side dark for text, right fades */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-brand-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/60" />
      </div>

      {/* Content */}
      <div className="container px-4 md:px-6 relative z-20 h-screen flex items-center mx-auto">
        <div className="flex flex-col justify-center space-y-6 items-start max-w-2xl text-left">
          <div className="space-y-6">
            
            {/* Eyebrow */}
            <div className={`flex items-center gap-3 transition-all duration-1000 ${
              showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <span className="block w-8 h-0.5 bg-brand-wood" />
              <p className="text-brand-woodLight text-xs sm:text-sm font-semibold tracking-wider uppercase">
                {hero.eyebrow}
              </p>
            </div>

            {/* Headline */}
            <h1 className="text-fluid-hero font-semibold lg:font-bold text-white tracking-[-0.035em] leading-[1.08] drop-shadow-lg" style={{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)' }}>
              {isClient ? (
                <>
                  {displayBase}
                  {displayText.length > baseHeadline.length && <br />}
                  <span className="text-brand-wood">{displayLast}</span>
                </>
              ) : (
                <>
                  {baseHeadline}
                  <br />
                  <span className="text-brand-wood">{lastWord}</span>
                </>
              )}
            </h1>

            {/* Scroll animated container for Subheadline and Description */}
            <div 
              ref={descriptionRef}
              className={`transition-all duration-1000 ${
                showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transform: `translateX(${scrollY * 1.5}px) translateY(${showDescription ? '0' : '16px'})`,
              }}
            >
              {/* Subheadline */}
              <p className="text-white/80 text-sm md:text-base font-semibold tracking-[0.05em] mb-6">
                {hero.subheadline}
              </p>

              {/* Description */}
              <p className="max-w-[600px] text-white/70 text-base md:text-lg font-normal leading-relaxed tracking-tight border-l-4 border-brand-wood pl-4 hover:border-brand-woodLight transition-all duration-1000">
                {hero.description}
              </p>
            </div>
          </div>
          
          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-start w-full sm:w-auto max-w-md sm:max-w-none transition-all duration-1000 ${
            showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Button
              href={hero.ctaPrimary.href}
              variant="primary"
              size="lg"
              arrow
              id="hero-cta-primary"
              className="w-full sm:w-auto justify-center rounded-xl font-semibold tracking-tight py-3.5 sm:py-4 px-7 text-sm sm:text-base shadow-[0_10px_25px_-5px_rgba(197,138,78,0.45)] hover:shadow-[0_15px_30px_-5px_rgba(197,138,78,0.6)] active:scale-[0.98] transition-all"
            >
              {hero.ctaPrimary.label}
            </Button>
            <Button
              href={hero.ctaSecondary.href}
              variant="secondary"
              size="lg"
              arrow
              id="hero-cta-secondary"
              className="w-full sm:w-auto justify-center rounded-xl font-semibold tracking-tight py-3.5 sm:py-4 px-7 text-sm sm:text-base bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-brand-dark active:scale-[0.98] transition-all"
            >
              {hero.ctaSecondary.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 bg-black backdrop-blur-sm border-t border-white/10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/15">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-4 lg:px-6 xl:px-8 justify-start"
              >
                {/* Custom icon image */}
                <div className="flex-shrink-0">
                  <StatIcon index={i} />
                </div>

                {/* Text section */}
                <div className="flex flex-col justify-center text-left flex-1 min-w-0">
                  <p className="text-left text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-[-0.03em] leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-left text-white/70 text-xs tracking-tight font-medium leading-snug">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}