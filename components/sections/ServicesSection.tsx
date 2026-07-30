import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/types";

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Services"
          heading="End-to-End Construction & Renovation Solutions"
          highlightWord="Construction"
          subheading="Tailored to your needs — from new builds to maintenance, we've got you covered."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              id={`service-card-${service.slug}`}
              className="group flex flex-col items-center justify-center text-center p-8 bg-[#f9f9f9] border border-gray-200/80 rounded-2xl hover:border-brand-wood transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Center Icon */}
              <div className="mb-6 flex justify-center text-brand-wood group-hover:scale-110 transition-transform duration-300">
                <ServiceIcon icon={service.icon} className="w-50 h-34 object-contain" />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-brand-dark text-base tracking-tight leading-snug mb-3 group-hover:text-brand-wood transition-colors duration-300">
                {service.title}
              </h3>

              {/* Short Description */}
              <p className="text-center text-gray-500 text-sm font-normal leading-relaxed max-w-[200px]">
                {service.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}