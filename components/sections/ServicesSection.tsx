import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/types";

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const getGridClasses = (index: number) => {
    switch (index) {
      case 0:
        return "lg:col-span-8 lg:row-span-2 md:col-span-12 col-span-12 min-h-[400px] lg:min-h-[600px]";
      case 1:
        return "lg:col-span-4 md:col-span-6 col-span-12 min-h-[300px]";
      case 2:
        return "lg:col-span-4 md:col-span-6 col-span-12 min-h-[300px]";
      case 3:
        return "lg:col-span-6 md:col-span-6 col-span-12 min-h-[350px]";
      case 4:
        return "lg:col-span-6 md:col-span-12 col-span-12 min-h-[350px]";
      default:
        return "lg:col-span-4 md:col-span-6 col-span-12 min-h-[300px]";
    }
  };

  return (
    <section id="services" className="bg-brand-dark py-16 md:py-24 relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-wood/5 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-brand-wood/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 md:mb-20">
          <SectionHeader
            eyebrow="Our Expertise"
            heading="End-to-End Construction Solutions"
            highlightWord="Construction"
            subheading="Tailored to your needs — from new builds to maintenance, we've got you covered with uncompromising quality."
            centered
            light
          />
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {services.slice(0, 5).map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              id={`service-bento-${service.slug}`}
              className={`group relative overflow-hidden rounded-3xl block ${getGridClasses(
                index
              )}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <div className="w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-in-out">
                  <ServiceIcon
                    icon={service.icon}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-brand-wood/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500" />

              {/* Content Wrapper */}
              <div className="absolute inset-0 p-6 md:p-8 xl:p-10 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white text-2xl md:text-3xl tracking-tight leading-tight">
                      {service.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100 border border-white/20">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed opacity-0 group-hover:opacity-100 max-w-[90%] transition-opacity duration-500 delay-150">
                    {service.shortDescription}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {services.length > 5 && (
          <div className="mt-16 flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-wood text-white text-sm font-bold tracking-wide rounded-full hover:bg-white hover:text-brand-dark transition-all duration-300 group shadow-[0_0_40px_rgba(181,101,29,0.3)] hover:shadow-xl"
            >
              Explore All Services
              <span className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-brand-dark/10 flex items-center justify-center transition-colors">
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}