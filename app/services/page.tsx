import Link from "next/link";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CTABanner } from "@/components/sections/CTABanner";
import { getServices } from "@/lib/data-service";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AnimatedPageHero } from "@/components/ui/AnimatedPageHero";
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
      <AnimatedPageHero
        title={"End-to-End Construction &\nRenovation"}
        highlightWord="Renovation"
        description="From groundwork to finishing touches — we deliver complete, quality solutions for residential, commercial and industrial projects."
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "OUR SERVICES" }
        ]}
      />

      {/* Services Grid (Enhanced UI) */}
    {/* Services Grid */}
<ServicesGridInteractive services={services} />
      <CTABanner />
    </>
  );
}