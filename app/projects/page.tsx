import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/sections/CTABanner";
import { ProjectHighlightsGrid } from "@/components/sections/ProjectHighlightsGrid";
import { getProjectCategories, getProjectHighlights } from "@/lib/data-service";
import { generatePageMetadata } from "@/lib/seo";
import { AnimatedPageHero } from "@/components/ui/AnimatedPageHero";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Projects",
  description:
    "Explore Timberpark's completed projects across residential HDB, landed houses, commercial offices and industrial warehouses in Singapore.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const [categories, highlights] = await Promise.all([
    getProjectCategories(),
    getProjectHighlights(),
  ]);

  return (
    <>
      {/* Hero */}
      <AnimatedPageHero
        title={"Delivering Quality Across\nEvery Sector"}
        highlightWord="Every Sector"
        description="Residential, commercial and industrial projects delivered with pride across Singapore since 2021."
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "OUR PROJECTS" }
        ]}
      />

      {/* Categories grid */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-wood mb-3 text-center">Project Categories</p>
          <h2 className="text-fluid-h2 font-semibold md:font-bold text-brand-dark text-center mb-12 tracking-[-0.03em]">
            Sectors We Serve
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                id={`project-cat-${cat.slug}`}
                className="group overflow-hidden"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/20 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent" />
                  <div className="absolute bottom-0 p-5">
                    <Badge label={cat.sector} />
                  </div>
                </div>
                <div className="bg-brand-cream p-5 border border-gray-100">
                  <h3 className="font-semibold text-brand-dark text-base tracking-tight mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-gray-500 text-xs font-normal leading-relaxed">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Project Highlights Grid with Click-to-View Modal */}
          <div className="border-t border-gray-100 pt-16">
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-wood mb-3 text-center">Track Record</p>
            <h2 className="text-fluid-h2 font-semibold md:font-bold text-brand-dark text-center mb-3 tracking-[-0.03em]">
              Project <span className="text-brand-wood">Highlights</span>
            </h2>
            <p className="text-gray-500 text-center max-w-xl mx-auto mb-12 text-sm font-normal">
              Click any project card below to view full details, scope of work, and image gallery.
            </p>

            <ProjectHighlightsGrid highlights={highlights} />
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
