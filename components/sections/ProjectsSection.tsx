import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ProjectCategory } from "@/types";

interface ProjectsSectionProps {
  categories: ProjectCategory[];
}

export function ProjectsSection({ categories }: ProjectsSectionProps) {
  return (
    <section id="projects" className="bg-brand-dark py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Projects"
          heading="Delivering Quality Across Every Sector"
          highlightWord="Quality"
          subheading="Residential, commercial and industrial projects delivered with pride."
          centered
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/projects`}
              id={`project-category-${cat.slug}`}
              className="group relative overflow-hidden block"
            >
              {/* Image */}
              <div className="relative h-60 sm:h-72 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-brand-dark/50 group-hover:bg-brand-dark/30 transition-colors duration-300" />
                {/* Gradient from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <Badge label={cat.sector} className="mb-2" />
                <h3 className="text-white font-semibold text-base tracking-tight leading-tight">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button href="/projects" variant="secondary" size="md" arrow id="projects-view-all">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
