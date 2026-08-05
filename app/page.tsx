import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { getSiteConfig, getServices, getProjectCategories, getTestimonials } from "@/lib/data-service";
import { generatePageMetadata, generateWebPageSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Home",
  description: "Timberpark Pte. Ltd. — trusted Singapore construction and renovation company for residential, commercial and industrial projects. Get a free quote today.",
  path: "/",
  keywords: ["construction singapore", "renovation contractor singapore", "best renovation company"],
});

export default async function HomePage() {
  const [config, services, projectCategories, testimonials] = await Promise.all([
    getSiteConfig(),
    getServices(),
    getProjectCategories(),
    getTestimonials(),
  ]);

  const webPageSchema = generateWebPageSchema(
    "Timberpark Pte. Ltd. | Renovation & Construction Singapore",
    "Timberpark Pte. Ltd. — trusted Singapore construction and renovation company for residential, commercial and industrial projects. Get a free quote today.",
    "/"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <HeroSection config={config} />
      <AboutSection config={config} />
      <ServicesSection services={services} />
      <ProjectsSection categories={projectCategories} />
      <WhyUsSection />
      <CertificationsSection />
      <TestimonialsSection testimonials={testimonials} />
      <CTABanner />
    </>
  );
}
