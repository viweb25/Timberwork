import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { SiteConfig } from "@/types";
import { StatIcon } from "@/components/ui/StatIcon";
interface AboutSectionProps {
  config: SiteConfig;

}

export function AboutSection({ config }: AboutSectionProps) {
  const { about } = config;
  const { hero, stats } = config;

  return (
    <section id="about" className="bg-brand-cream">
      {/* Stats bar */}
      <div className="w-full bg-brand-dark border-b border-white/10 shadow-xl">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
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
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: text */}
          <div>
            <p className="text-center lg:text-left text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-wood mb-3">
              About Us
            </p>
            <h2 className="text-center lg:text-left text-fluid-h2 font-semibold md:font-bold text-brand-dark leading-[1.1] tracking-[-0.03em] mb-6">
              Building Your Vision With{" "}
              <span className="text-brand-wood">Expertise</span> and Integrity.
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed tracking-tight mb-8">
              {about.body}
            </p>

            {/* Mission + Vision cards */}
            <div className="space-y-4 mb-8">
              <div className="flex gap-4 p-5 bg-white border-l-4 border-brand-wood shadow-card">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-brand-wood" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark text-sm tracking-tight mb-1">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 text-sm font-normal leading-relaxed">{about.mission}</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white border-l-4 border-brand-wood shadow-card">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-brand-wood" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark text-sm tracking-tight mb-1">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 text-sm font-normal leading-relaxed">{about.vision}</p>
                </div>
              </div>
            </div>

            <Button href="/about" variant="outline" size="md" arrow id="about-learn-more">
              Learn More About Us
            </Button>
          </div>

          {/* Right: image */}
          <div className="relative">
            <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
              <Image
                src="/images/about-interior.jpg"
                alt="Luxurious interior renovation completed by Timberpark Pte. Ltd."
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-brand-wood" />
            <div className="absolute -top-4 -right-4 w-16 h-16 border-2 border-brand-wood" />
          </div>
        </div>
      </div>
    </section>
  );
}
