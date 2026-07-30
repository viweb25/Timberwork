import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { SiteConfig } from "@/types";
import { StatIcon } from "@/components/ui/StatIcon";

interface HeroSectionProps {
  config: SiteConfig;
}

export function HeroSection({ config }: HeroSectionProps) {
  const { hero, stats } = config;

  // Split headline to highlight the last word
  const headlineWords = hero.headline.split(" ");
  const baseHeadline = headlineWords.slice(0, -1).join(" ");
  const lastWord = headlineWords[headlineWords.length - 1];

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
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="max-w-2xl text-left lg:-ml-6 xl:-ml-24">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <span className="block w-8 h-0.5 bg-brand-wood" />
              <p className="text-brand-woodLight text-xs sm:text-sm font-semibold tracking-wider uppercase">
                {hero.eyebrow}
              </p>
            </div>

            {/* Headline */}
            <h1 className="text-fluid-hero font-semibold lg:font-bold text-white tracking-[-0.035em] leading-[1.08] mb-4 animate-fade-in-up">
              {baseHeadline}
              <br />
              <span className="text-brand-wood">{lastWord}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-white/80 text-sm md:text-base font-semibold tracking-[0.05em] mb-6 animate-fade-in-up">
              {hero.subheadline}
            </p>

            {/* Description */}
            <p className="text-white/70 text-base md:text-lg font-normal leading-relaxed tracking-tight mb-10 max-w-xl animate-fade-in-up">
              {hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 animate-fade-in-up justify-start w-full sm:w-auto max-w-md sm:max-w-none">
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