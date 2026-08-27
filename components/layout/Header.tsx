"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Why Us", href: "/why-us" },
  { label: "Contact Us", href: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      if (hero) {
        // Turn black when scrolled past the hero section (minus a small offset for transition)
        const isPastHero = window.scrollY >= (hero.offsetHeight - 80);
        setIsScrolled(isPastHero);
      } else {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 50);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Call once to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? 'bg-black border-b border-white/10 shadow-lg'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto">
          <div className="flex h-[60px] md:h-[80px] items-center justify-between relative z-10">
            {/* Logo on the left */}
            <div className="flex items-center z-20">
              <Link href="/" className="flex items-center gap-0 group">
                <div className="relative w-[180px] h-[60px] md:w-[280px] md:h-[80px] flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="https://res.cloudinary.com/defqgygsf/image/upload/v1785313073/logoo-removebg-preview_qa5j6h.png"
                    alt="Timberpark Pte. Ltd. Logo"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Absolutely Centered Navigation - Only visible on large screens (desktop) */}
            <nav className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 gap-8 text-[15px] font-medium tracking-wide z-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  prefetch={true}
                  className="transition-colors duration-300 text-white hover:text-brand-wood"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button and CTA on the right */}
            <div className="flex items-center gap-4 z-20">
              <Button
                href="/contact"
                variant="primary"
                size="sm"
                arrow
                className="hidden sm:inline-flex text-xs border-none"
              >
                Get a Free Quote
              </Button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  "lg:hidden p-2 hover:bg-white/10 rounded-md transition-all duration-300 relative group",
                  isMenuOpen ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100',
                  "text-white"
                )}
                aria-label="Toggle navigation menu"
              >
                <div className="relative w-[30px] h-[15px] flex flex-col justify-between transform transition-transform duration-300 group-hover:scale-110">
                  <span className="block h-[3px] w-[30px] bg-current rounded-full transition-all duration-600 ease-in-out origin-center" />
                  <span className="block h-[3px] w-[30px] bg-current rounded-full transition-all duration-600 ease-in-out origin-center" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-all duration-300",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300 bg-black/50 backdrop-blur-sm",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={cn(
            "absolute top-0 right-0 h-full w-64 bg-[#0a0a0a] flex flex-col items-end justify-center py-6 pr-6 transform transition-all duration-300 ease-in-out shadow-2xl border-l border-white/10",
            isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 left-6 text-white hover:text-brand-wood transition-colors duration-200 p-1"
          >
            <X className="h-6 w-6" />
          </button>

          <nav className="flex flex-col space-y-4 mt-8 w-full">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                prefetch={true}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-4 py-3 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-300 text-center transform relative overflow-hidden tracking-wide",
                  isMenuOpen ? "opacity-100 translate-x-0 delay-100" : "opacity-0 translate-x-4"
                )}
                style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            ))}

            <div className={cn(
              "pt-8 w-full px-4 flex justify-center transition-all duration-300 transform",
              isMenuOpen ? "opacity-100 translate-x-0 delay-300" : "opacity-0 translate-x-4"
            )}>
              <Button
                href="/contact"
                variant="primary"
                size="md"
                arrow
              >
                Get a Free Quote
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
