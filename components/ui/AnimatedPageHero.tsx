"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface AnimatedPageHeroProps {
  title: string;
  highlightWord?: string;
  description?: React.ReactNode;
  breadcrumbs: Breadcrumb[];
  bgImage?: string;
}

export function AnimatedPageHero({
  title,
  highlightWord,
  description,
  breadcrumbs,
  bgImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
}: AnimatedPageHeroProps) {
  const [isClient, setIsClient] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

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
    if (isTyping && currentIndex < title.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + title[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // Typing speed
      return () => clearTimeout(timeout);
    } else if (currentIndex >= title.length) {
      // Finished typing, show description after a short delay
      setIsTyping(false);
      const showDescTimeout = setTimeout(() => {
        setShowDescription(true);
      }, 300);
      
      return () => {
        clearTimeout(showDescTimeout);
      };
    }
  }, [currentIndex, title, isTyping]);

  let content;
  if (!isClient) {
    // SSR output
    if (highlightWord && title.includes(highlightWord)) {
      const parts = title.split(highlightWord);
      content = (
        <>
          {parts[0]}
          <span className="text-brand-wood">{highlightWord}</span>
          {parts[1]}
        </>
      );
    } else {
      content = title;
    }
  } else {
    // Client output with typing
    if (highlightWord && title.includes(highlightWord)) {
      const startIndex = title.indexOf(highlightWord);
      const endIndex = startIndex + highlightWord.length;
      
      const before = displayText.substring(0, startIndex);
      const highlight = displayText.substring(startIndex, endIndex);
      const after = displayText.substring(endIndex);
      
      content = (
        <>
          {before}
          {highlight && <span className="text-brand-wood">{highlight}</span>}
          {after}
        </>
      );
    } else {
      content = displayText;
    }
  }

  return (
    <section className="relative pt-32 pb-24 flex items-center min-h-[450px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-brand-dark">
        <Image
          src={bgImage}
          alt="Page Hero Background"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6">
          {breadcrumbs.map((bc, idx) => (
            <React.Fragment key={idx}>
              {bc.href ? (
                <Link href={bc.href} className="text-white/60 hover:text-brand-wood text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-colors">
                  {bc.label}
                </Link>
              ) : (
                <span className="text-white text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                  {bc.label}
                </span>
              )}
              {idx < breadcrumbs.length - 1 && (
                <span className="text-white/40 text-xs">/</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Headline */}
        <h1 className="whitespace-pre-line text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1] drop-shadow-lg" style={{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)' }}>
          {content}
        </h1>

        {/* Scroll animated container for Description */}
        {description && (
          <div 
            ref={descriptionRef}
            className={`transition-all duration-1000 ${
              showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transform: `translateX(${scrollY * 0.5}px) translateY(${showDescription ? '0' : '16px'})`,
            }}
          >
            <div className="text-white/80 text-sm md:text-base font-normal leading-relaxed max-w-xl border-l-4 border-brand-wood pl-4">
              {description}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
