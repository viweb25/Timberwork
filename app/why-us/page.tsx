import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { generatePageMetadata, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";
import type { Metadata } from "next";
import { AnimatedPageHero } from "@/components/ui/AnimatedPageHero";

export const metadata: Metadata = generatePageMetadata({
  title: "Why Choose Us",
  description:
    "Discover why homeowners and businesses across Singapore trust Timberpark Pte. Ltd. for construction and renovation — quality, safety, transparency and on-time delivery.",
  path: "/why-us",
  keywords: ["reliable contractor singapore", "best renovation company", "trusted builder singapore"],
});

export default function WhyUsPage() {
  const webPageSchema = generateWebPageSchema("Why Choose Us", metadata.description as string, "/why-us");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Why Choose Us", url: "/why-us" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([webPageSchema, breadcrumbSchema]) }} />
      {/* Hero */}
      <AnimatedPageHero
        title={"The Timberpark\nDifference"}
        highlightWord="Timberpark"
        description="Top reasons Singapore homeowners and businesses trust us with their most important projects."
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "WHY CHOOSE US" }
        ]}
      />

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
