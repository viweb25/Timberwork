import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Why Choose Us",
  description:
    "Discover why homeowners and businesses across Singapore trust Timberpark Pte. Ltd. for construction and renovation â€” quality, safety, transparency and on-time delivery.",
  path: "/why-us",
});

export default function WhyUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-0.5 bg-brand-wood" />
            <p className="text-brand-woodLight text-xs sm:text-sm font-semibold tracking-wider uppercase">Why Choose Us</p>
          </div>
          <h1 className="text-fluid-h2 font-semibold md:font-bold text-white mb-4 tracking-[-0.03em] leading-[1.08]">
            The <span className="text-brand-wood">Timberpark</span> Difference
          </h1>
          <p className="text-white/70 text-base md:text-lg font-normal leading-relaxed tracking-tight max-w-2xl">
            Six reasons Singapore homeowners and businesses trust us with their most important projects.
          </p>
        </div>
      </section>

      <WhyUsSection />

      {/* Quality commitment callout */}
      <section className="bg-brand-cream py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-center text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-wood mb-3">Our Commitment</p>
          <h2 className="text-center text-fluid-h3 font-semibold md:font-bold text-brand-dark mb-5 tracking-tight">
            100% Commitment to Quality & Safety
          </h2>
          <p className="text-center text-gray-600 font-normal leading-relaxed text-base">
            At Timberpark, we believe that quality and safety are not negotiable. Every project — regardless of size — receives the same professional attention, the same rigorous standards, and the same dedication to delivering exactly what we promised. This is why our clients come back and refer us to others.
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
