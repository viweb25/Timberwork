import Link from "next/link";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CTABanner } from "@/components/sections/CTABanner";
import { getServices } from "@/lib/data-service";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ServicesGridInteractive } from "@/components/sections/ServicesGridInteractive";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Services",
  description:
    "Timberpark Pte. Ltd. offers general construction, renovation, interior works, M&E services and maintenance across Singapore. Get a free quote.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-0.5 bg-brand-wood" />
            <p className="text-brand-woodLight text-xs sm:text-sm font-semibold tracking-wider uppercase">
              Our Services
            </p>
          </div>
          <h1 className="text-fluid-h2 font-semibold md:font-bold text-white mb-4 tracking-[-0.03em] leading-[1.08]">
            End-to-End Construction &{" "}
            <span className="text-brand-wood">Renovation</span>
          </h1>
          <p className="text-white/70 text-base md:text-lg font-normal leading-relaxed tracking-tight max-w-2xl">
            From groundwork to finishing touches — we deliver complete, quality
            solutions for residential, commercial and industrial projects.
          </p>
        </div>
      </section>

      {/* Services Grid (Enhanced UI) */}
    {/* Services Grid */}
<ServicesGridInteractive services={services} />
      <CTABanner />
    </>
  );
}