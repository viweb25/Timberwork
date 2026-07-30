"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-brand-dark"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px] md:h-[80px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" id="header-logo">
              <div className="relative w-[180px] h-[60px] md:w-[280px] md:h-[80px] flex-shrink-0">
                {/* Logo for scrolled / light background */}
                <Image
                  src="https://res.cloudinary.com/defqgygsf/image/upload/v1785314867/loogo-removebg-preview_iannzb.png"
                  alt="Timberpark Pte. Ltd. Logo"
                  fill
                  className={cn(
                    "object-contain object-left transition-opacity duration-300",
                    scrolled ? "opacity-100" : "opacity-0"
                  )}
                  priority
                />
                {/* Logo for top / dark background */}
                <Image
                  src="https://res.cloudinary.com/defqgygsf/image/upload/v1785313073/logoo-removebg-preview_qa5j6h.png"
                  alt="Timberpark Pte. Ltd. Logo"
                  fill
                  className={cn(
                    "object-contain object-left transition-opacity duration-300",
                    scrolled ? "opacity-0" : "opacity-100"
                  )}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6" id="desktop-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={cn(
                    "text-sm font-medium tracking-tight transition-colors duration-200",
                    scrolled 
                      ? "text-brand-dark hover:text-brand-wood" 
                      : "text-white/90 hover:text-brand-wood"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Button
                href="/contact"
                variant="primary"
                size="sm"
                arrow
                id="header-cta"
                className="hidden sm:inline-flex text-xs"
              >
                Get a Free Quote
              </Button>

              {/* Mobile Menu Button */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                className={cn(
                  "lg:hidden p-2 hover:text-brand-wood transition-colors",
                  scrolled ? "text-brand-dark" : "text-white"
                )}
                aria-label="Toggle menu"
              >
                <div className="w-6 flex flex-col gap-1.5">
                  <span
                    className={cn(
                      "block h-0.5 bg-current transition-all duration-300",
                      menuOpen && "rotate-45 translate-y-2"
                    )}
                  />
                  <span
                    className={cn(
                      "block h-0.5 bg-current transition-all duration-300",
                      menuOpen && "opacity-0"
                    )}
                  />
                  <span
                    className={cn(
                      "block h-0.5 bg-current transition-all duration-300",
                      menuOpen && "-rotate-45 -translate-y-2"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMenuOpen(false)}
        />
        <nav
          className={cn(
            "absolute top-0 right-0 h-full w-72 bg-brand-dark flex flex-col pt-24 pb-8 px-8 transition-transform duration-300",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
          id="mobile-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              onClick={() => setMenuOpen(false)}
              className="text-white/90 hover:text-brand-wood text-base font-medium tracking-tight py-4 border-b border-white/10 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Button
            href="/contact"
            variant="primary"
            size="md"
            arrow
            className="mt-8"
            id="mobile-cta"
          >
            Get a Free Quote
          </Button>
        </nav>
      </div>
    </>
  );
}
