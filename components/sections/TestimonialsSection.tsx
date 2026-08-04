"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Testimonial } from "@/types";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const AVATAR_TONES = [
  "bg-brand-dark/[0.08] text-brand-dark",
  "bg-amber-400/[0.15] text-amber-700",
  "bg-emerald-500/[0.10] text-emerald-700",
  "bg-sky-500/[0.10] text-sky-700",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function QuoteMark() {
  return (
    <svg className="w-8 h-8 text-brand-dark/15" viewBox="0 0 32 32" fill="currentColor">
      <path d="M9.5 18C7 18 5 16 5 13.2c0-4 3-7.6 7-9.2l1 1.8c-3 1.4-4.8 3.6-4.8 6 .3-.1.7-.2 1.1-.2 2.3 0 4.2 1.8 4.2 4.2S11.8 18 9.5 18zm14 0c-2.5 0-4.5-2-4.5-4.8 0-4 3-7.6 7-9.2l1 1.8c-3 1.4-4.8 3.6-4.8 6 .3-.1.7-.2 1.1-.2 2.3 0 4.2 1.8 4.2 4.2S25.8 18 23.5 18z" />
    </svg>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Mobile3DTestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <div className="lg:hidden mt-10 relative px-2 select-none overflow-hidden py-4">
      {/* 3D Stage Container */}
      <div
        className="relative h-[380px] w-full flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {testimonials.map((t, index) => {
          let offset = index - activeIndex;
          if (offset > testimonials.length / 2) offset -= testimonials.length;
          if (offset < -testimonials.length / 2) offset += testimonials.length;

          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 1;

          if (!isVisible) return null;

          let transformStyles = "";
          let zIndex = 10;
          let opacity = 0;

          if (isCenter) {
            transformStyles = "translateX(0%) scale(1) rotateY(0deg)";
            zIndex = 30;
            opacity = 1;
          } else if (offset < 0) {
            transformStyles = "translateX(-48%) scale(0.82) rotateY(24deg)";
            zIndex = 20;
            opacity = 0.55;
          } else if (offset > 0) {
            transformStyles = "translateX(48%) scale(0.82) rotateY(-24deg)";
            zIndex = 20;
            opacity = 0.55;
          }

          return (
            <motion.div
              key={t.id}
              onClick={() => setActiveIndex(index)}
              drag={isCenter ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={false}
              animate={{
                transform: transformStyles,
                opacity,
                zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
              }}
              className={`absolute w-[86%] max-w-[340px] bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] cursor-pointer touch-pan-y ${
                isCenter ? "ring-2 ring-brand-dark/10" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div>
                <QuoteMark />
                <p className="mt-3 text-gray-600 text-sm font-normal leading-relaxed line-clamp-4">
                  &quot;{t.text}&quot;
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${AVATAR_TONES[index % AVATAR_TONES.length]}`}>
                    {t.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-brand-dark text-sm tracking-tight truncate">{t.name}</p>
                    <p className="text-gray-500 text-xs truncate mt-0.5">
                      {t.role}
                      {t.company ? `, ${t.company}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <StarRating rating={t.rating} />
                  {t.projectType && (
                    <span className="text-[9px] font-semibold tracking-wider text-brand-dark/70 bg-brand-dark/[0.06] px-2 py-0.5 rounded-full uppercase">
                      {t.projectType}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="mt-6 flex items-center justify-between px-4">
        <button
          onClick={handlePrev}
          aria-label="Previous Review"
          className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-7 bg-brand-dark"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next Review"
          className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="relative bg-[#faf9f7] py-12 md:py-16 overflow-hidden">
      {/* Ambient background accents */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-brand-dark/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 w-[480px] h-[480px] rounded-full bg-amber-400/[0.06] blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          eyebrow="Client Testimonials"
          heading="What Our Clients Say"
          highlightWord="Clients"
          subheading="Trusted by homeowners, businesses and facility managers across Singapore."
          centered
        />

        {/* Mobile View: 3D Slider */}
        <Mobile3DTestimonialsSlider testimonials={testimonials} />

        {/* Desktop View: Grid layout */}
        <motion.div
          className="hidden lg:grid mt-16 md:mt-20 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Featured Image - spans 2 columns (Desktop only) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden relative shadow-[0_20px_45px_-15px_rgba(0,0,0,0.10)] min-h-[350px] md:min-h-[400px] group"
          >
            <Image
              src="https://res.cloudinary.com/defqgygsf/image/upload/v1785400217/tes_spb17e.png"
              alt="Timberpark Quality Craftsmanship"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-white text-xl md:text-3xl font-semibold leading-tight tracking-tight">
                Building trust through <span className="text-brand-wood">quality craftsmanship</span> and transparent processes.
              </p>
            </div>
          </motion.div>

          {/* Desktop testimonials cards */}
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              className="bg-white rounded-2xl border border-gray-100 p-7 flex flex-col justify-between shadow-sm hover:shadow-[0_16px_35px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-400"
            >
              <div>
                <QuoteMark />
                <p className="mt-4 text-gray-600 text-sm font-normal leading-relaxed line-clamp-4">
                  {t.text}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${AVATAR_TONES[(i + 1) % AVATAR_TONES.length]}`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm tracking-tight">{t.name}</p>
                    <p className="text-gray-500 text-xs font-normal mt-0.5">
                      {t.role}
                      {t.company ? `, ${t.company}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <StarRating rating={t.rating} />
                  {t.projectType && (
                    <span className="text-[9px] font-semibold tracking-wider text-brand-dark/70 bg-brand-dark/[0.06] px-2 py-1 rounded-full uppercase">
                      {t.projectType}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}