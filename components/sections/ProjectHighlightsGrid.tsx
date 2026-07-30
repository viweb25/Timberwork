"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { getProjectHighlightById } from "@/lib/data-service";
import type { ProjectHighlight } from "@/data/projectHighlights";

interface ProjectHighlightsGridProps {
  highlights: ProjectHighlight[];
}

function ProjectCard({ project, index, loadingId, onClick }: { project: ProjectHighlight, index: number, loadingId: string | null, onClick: (id: string) => void }) {
  const [imgIndex, setImgIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.images || project.images.length <= 1) return;
    setImgIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.images || project.images.length <= 1) return;
    setImgIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const setIndex = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setImgIndex(idx);
  };

  return (
   <button
      type="button"
      onClick={() => onClick(project.id)}
      id={`project-card-${project.id}`}
      className="group text-left w-full h-full flex flex-col bg-white border border-gray-100 hover:border-brand-wood/40 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-2xl cursor-pointer overflow-hidden"
    >
      {/* Image Slider at the top — UNCHANGED */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden flex-shrink-0 bg-brand-dark/5">
        {project.images && project.images.length > 0 && (
          <Image
            src={project.images[imgIndex]}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Slider Controls */}
        {project.images && project.images.length > 1 && (
          <>
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/90 text-white hover:text-brand-dark backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
              onClick={prevImage}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </div>
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/90 text-white hover:text-brand-dark backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
              onClick={nextImage}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </div>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.images.map((_, idx) => (
                <div
                  key={idx}
                  onClick={(e) => setIndex(e, idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer shadow-sm ${idx === imgIndex ? "bg-white w-4" : "bg-white/60 hover:bg-white/90"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content Below — PREMIUM / PROFESSIONAL */}
      <div className="relative p-6 sm:p-8 flex flex-col flex-1 justify-between bg-white">
        {/* Large ghost index number — signature element, gives weight without extra color */}
        <span className="pointer-events-none select-none absolute top-4 right-6 text-6xl sm:text-7xl font-extrabold text-brand-dark/[0.04] leading-none tracking-tighter">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative">
          <div className="flex items-center justify-between gap-3 mb-6">
            <span className="text-[11px] font-semibold text-white bg-brand-wood tracking-wider uppercase px-3 py-1.5 rounded-md shadow-sm shadow-brand-wood/30">
              Project {String(index + 1).padStart(2, "0")}
            </span>
            <Badge label={project.category} />
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-brand-dark leading-[1.15] tracking-tight group-hover:text-brand-wood transition-colors duration-300 mb-3 line-clamp-2">
            {project.title}
          </h3>

          {project.location && (
            <p className="text-sm font-normal text-gray-500 flex items-center gap-2 mb-2 line-clamp-1">
              <svg className="w-4 h-4 text-brand-wood flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.location}
            </p>
          )}
        </div>

        {/* CTA — thicker rule, filled circle icon instead of a plain row */}
        <div className="relative pt-6 mt-6 border-t-2 border-brand-dark/[0.06] flex items-center justify-between">
          <span className="text-sm font-medium text-brand-dark group-hover:text-brand-wood transition-colors duration-300 tracking-tight">
            {loadingId === project.id ? "Loading detail..." : "View Project Details"}
          </span>
          <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center group-hover:bg-brand-wood transition-all duration-300 group-hover:scale-110 shadow-md">
            <svg
              className="w-4 h-4 text-white transform group-hover:translate-x-0.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

export function ProjectHighlightsGrid({ highlights }: ProjectHighlightsGridProps) {
  const [selectedHighlight, setSelectedHighlight] = useState<ProjectHighlight | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle open modal via getProjectHighlightById service call
  const handleCardClick = async (id: string) => {
    setLoadingId(id);
    try {
      const data = await getProjectHighlightById(id);
      if (data) {
        setSelectedHighlight(data);
        setCurrentImageIndex(0);
        setIsOpen(true);
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedHighlight(null);
    }, 300);
  }, []);

  // Keyboard navigation & Esc key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus close button for accessibility
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handlePrevImage = () => {
    if (!selectedHighlight || selectedHighlight.images.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedHighlight.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!selectedHighlight || selectedHighlight.images.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === selectedHighlight.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {/* 6-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            loadingId={loadingId} 
            onClick={handleCardClick} 
          />
        ))}
      </div>

      {/* Modal Backdrop & Dialog */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop Overlay */}
        <div
          className={`absolute inset-0 bg-brand-dark/80 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleClose}
        />

        {/* Modal Window Container */}
        {selectedHighlight && (
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            className={`relative z-10 w-full max-w-3xl max-h-[90vh] bg-white border border-brand-wood/20 shadow-2xl rounded-2xl overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col transition-all duration-300 transform ${
              isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
            }`}
          >
            {/* Header — PREMIUM: eyebrow label, tighter hierarchy, stronger title weight */}
            <div className="bg-brand-dark text-white p-6 sm:p-8 relative border-b border-white/10 sticky top-0 z-20">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                aria-label="Close project modal"
                className="absolute top-6 right-6 text-white/70 hover:text-brand-dark p-2 transition-colors duration-200 cursor-pointer rounded-full hover:bg-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="pr-14">
                <span className="text-[10px] font-semibold text-brand-wood tracking-[0.2em] uppercase mb-3 block">
                  Project Overview
                </span>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge label={selectedHighlight.category} />
                  {selectedHighlight.completionDate && (
                    <span className="text-[11px] text-brand-woodLight font-medium tracking-wider uppercase bg-white/10 px-3 py-1.5 rounded-md">
                      Completed {selectedHighlight.completionDate}
                    </span>
                  )}
                </div>
                <h2
                  id="modal-project-title"
                  className="text-2xl sm:text-3xl font-semibold text-white leading-tight tracking-tight"
                >
                  {selectedHighlight.title}
                </h2>
              </div>
            </div>

            {/* Modal Content Body — PREMIUM */}
            <div className="p-6 sm:p-8 space-y-8 bg-brand-cream/30">
              {/* Image Gallery */}
              {selectedHighlight.images && selectedHighlight.images.length > 0 && (
                <div className="relative h-64 sm:h-80 md:h-96 w-full bg-brand-dark/10 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <Image
                    src={selectedHighlight.images[currentImageIndex] || selectedHighlight.images[0]}
                    alt={selectedHighlight.title}
                    fill
                    className="object-cover transition-all duration-300"
                  />

                  {/* Previous / Next buttons for multiple images */}
                  {selectedHighlight.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-brand-dark/70 hover:bg-brand-wood text-white p-2.5 rounded-full transition-colors cursor-pointer backdrop-blur-sm"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={handleNextImage}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-dark/70 hover:bg-brand-wood text-white p-2.5 rounded-full transition-colors cursor-pointer backdrop-blur-sm"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Dots indicator */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-brand-dark/60 px-3 py-1.5 rounded-full">
                        {selectedHighlight.images.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImageIndex ? "bg-brand-wood w-4" : "bg-white/60"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Location details */}
              {selectedHighlight.location && selectedHighlight.location.trim() !== "" && (
                <div className="flex items-center gap-3 text-sm text-brand-dark font-medium bg-white p-4 rounded-xl border-l-4 border-brand-wood shadow-sm">
                  <svg className="w-5 h-5 text-brand-wood flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>
                    <span className="text-gray-500 font-normal mr-1.5">Location:</span>
                    {selectedHighlight.location}
                  </span>
                </div>
              )}

              {/* Scope of Work */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-wood">
                    Scope of Work
                  </h3>
                  <div className="h-px flex-1 bg-brand-wood/20" />
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedHighlight.scopeOfWork.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-brand-wood/30 transition-all duration-200">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-wood/10 text-brand-wood text-[11px] font-semibold flex items-center justify-center mt-0.5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-brand-dark leading-relaxed font-normal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-wood">
                    Project Description
                  </h3>
                  <div className="h-px flex-1 bg-brand-wood/20" />
                </div>
                <p className="text-gray-700 text-base font-normal leading-relaxed bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm">
                  {selectedHighlight.description}
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
}