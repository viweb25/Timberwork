"use client";

import Link from "next/link";
import { useState } from "react";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  services: Service[];
}

export function ServicesGridInteractive({ services }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  return (
    <section className="bg-brand-cream py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-8 h-0.5 bg-brand-wood" />
          <p className="text-brand-wood text-xs sm:text-sm font-semibold tracking-wider uppercase">
            What We Do
          </p>
        </div>
        <h2 className="text-fluid-h2 font-semibold md:font-bold text-brand-dark tracking-[-0.03em] leading-[1.1] mb-10 md:mb-16 max-w-2xl">
          Our Core Services
        </h2>

        {/* MOBILE VIEW: Interactive Accordion Cards (< lg) */}
        <div className="block lg:hidden space-y-4">
          {/* Mobile Section Sub-Header */}
          <div className="flex items-center justify-between px-1 mb-3">
            <span className="text-xs font-semibold tracking-wider text-brand-wood uppercase">
              All Core Services
            </span>
            <span className="text-[10px] font-medium text-gray-500 bg-gray-200/60 px-2.5 py-1 rounded-full tracking-tight">
              Tap card to view details
            </span>
          </div>

          {/* Accordion Cards List */}
          <div className="space-y-3.5">
            {services.map((service, index) => {
              const isOpen = index === activeIndex;
              return (
                <div
                  key={service.slug}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-brand-wood shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08)] ring-1 ring-brand-wood/20"
                      : "border-gray-200/80 hover:border-gray-300 shadow-sm"
                  }`}
                >
                  {/* Card Header */}
                  <button
                    type="button"
                    onClick={() => setActiveIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-semibold border shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "bg-brand-wood border-brand-wood text-white shadow-sm"
                            : "bg-brand-cream border-gray-200 text-gray-500"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className={`text-sm sm:text-base font-semibold tracking-tight leading-snug ${
                          isOpen ? "text-brand-wood" : "text-brand-dark"
                        }`}>
                          {service.title}
                        </h3>
                        {!isOpen && (
                          <p className="text-xs font-normal text-gray-500 truncate mt-0.5">
                            {service.shortDescription}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-brand-wood/10 text-brand-wood rotate-180" : "bg-gray-100 text-gray-400"
                    }`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Card Content Expand */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-5 pb-6 pt-2 border-t border-gray-100">
                          <p className="text-gray-600 text-sm font-normal leading-relaxed mb-5">
                            {service.shortDescription}
                          </p>

                          {/* Features list */}
                          <div className="grid grid-cols-1 gap-2.5 mb-6 bg-brand-cream/50 p-4 rounded-xl border border-gray-100">
                            <p className="text-xs font-semibold tracking-wider text-brand-dark/60 mb-1 uppercase">
                              Key Highlights:
                            </p>
                            {service.features.slice(0, 8).map((f: string) => (
                              <div key={f} className="flex items-start gap-2.5">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-wood shrink-0" />
                                <span className="text-xs font-normal text-brand-dark/90">{f}</span>
                              </div>
                            ))}
                          </div>

                          {/* CTA Button */}
                          <Link
                            href={`/services/${service.slug}`}
                            id={`services-mobile-card-${service.slug}`}
                            className="w-full flex items-center justify-between bg-brand-dark text-white text-xs font-semibold tracking-tight px-6 py-3.5 rounded-xl hover:bg-brand-wood transition-colors duration-300 shadow-md group"
                          >
                            <span>Learn More</span>
                            <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-brand-dark transition-all shrink-0">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* DESKTOP VIEW: Interactive Timeline + Detail Panel (>= lg) */}
        <div className="hidden lg:grid grid-cols-12 gap-16">
          {/* LEFT: minimal list + timeline connector, sticky */}
          <div className="col-span-5 sticky top-32 self-start">
            <ul className="relative">
              <span className="absolute left-[27px] top-2 bottom-2 w-px bg-gray-200" />
              {services.map((service, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={service.slug} className="relative">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`w-full flex items-center gap-5 py-5 text-left border-b transition-colors duration-300 ${
                        isActive ? "border-brand-wood" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span
                        className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${
                          isActive
                            ? "bg-brand-wood border-brand-wood text-white shadow-md"
                            : "bg-brand-cream border-gray-200 text-gray-400"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="flex-1">
                        <span
                          className={`block text-lg font-semibold tracking-tight transition-colors ${
                            isActive ? "text-brand-dark" : "text-gray-400"
                          }`}
                        >
                          {service.title}
                        </span>
                        {isActive && (
                          <span className="block text-xs font-normal text-gray-500 mt-1 line-clamp-1">
                            {service.shortDescription}
                          </span>
                        )}
                      </span>

                      <svg
                        className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                          isActive
                            ? "opacity-100 translate-x-0 text-brand-wood"
                            : "opacity-0 -translate-x-2 text-gray-400"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT: detail panel */}
          <div className="col-span-7">
            {active && (
              <div
                key={active.slug}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12"
              >
                {/* Top row: icon + number */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14  flex items-center justify-center text-brand-wood">
                   
                  </div>
                  <span className="text-6xl font-extrabold text-gray-100/90 tracking-tighter leading-none select-none">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title + description */}
                <h3 className="text-fluid-h3 font-semibold md:font-bold text-brand-dark tracking-[-0.03em] mb-4">
                  {active.title}
                </h3>
                <p className="text-gray-600 text-sm font-normal leading-relaxed mb-10 max-w-lg">
                  {active.shortDescription}
                </p>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-8" />

                {/* Features - 2 column grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-10">
                  {active.features.slice(0, 8).map((f: string) => (
                    <div key={f} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-wood flex-shrink-0" />
                      <span className="text-sm font-normal text-brand-dark/90">{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/services/${active.slug}`}
                  id={`services-page-card-${active.slug}`}
                  className="inline-flex items-center gap-2 bg-brand-dark text-white text-xs font-semibold tracking-tight px-7 py-3.5 rounded-full hover:bg-brand-wood hover:text-brand-dark transition-colors duration-300"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}