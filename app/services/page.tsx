import Link from "next/link";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CTABanner } from "@/components/sections/CTABanner";
import { getServices } from "@/lib/data-service";
import { generatePageMetadata, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";
import type { Metadata } from "next";
import { AnimatedPageHero } from "@/components/ui/AnimatedPageHero";
import { ServicesGridInteractive } from "@/components/sections/ServicesGridInteractive";
import { ServiceWhyChooseUs } from "@/components/sections/ServiceWhyChooseUs";
import { ServiceProcess } from "@/components/sections/ServiceProcess";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Services",
  description:
    "Timberpark Pte. Ltd. offers general construction, renovation, interior works, M&E services and maintenance across Singapore. Get a free quote.",
  path: "/services",
  keywords: ["construction services", "renovation works", "interior works singapore", "M&E services", "maintenance services"],
});

export default async function ServicesPage() {
  const services = await getServices();

  const webPageSchema = generateWebPageSchema("Our Services", metadata.description as string, "/services");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Our Services", url: "/services" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([webPageSchema, breadcrumbSchema]) }} />
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

      {/* Services Grid */}
      <ServicesGridInteractive services={services} />
      
      {/* Process Section */}
      <ServiceProcess />
      
      {/* Why Choose Us Section */}
      <ServiceWhyChooseUs />

      <CTABanner />
    </>
  );
}