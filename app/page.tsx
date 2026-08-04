import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { getSiteConfig, getServices, getProjectCategories, getTestimonials } from "@/lib/data-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timberpark Pte. Ltd. | Renovation & Construction Singapore",
  description:
    "Timberpark Pte. Ltd. â€” trusted Singapore construction and renovation company for residential, commercial and industrial projects. Get a free quote today.",
};

export default async function HomePage() {
  const [config, services, projectCategories, testimonials] = await Promise.all([
    getSiteConfig(),
    getServices(),
    getProjectCategories(),
    getTestimonials(),
  ]);

  return (
    <>
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
