import { notFound } from "next/navigation";
import Link from "next/link";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/Button";
import { getServiceBySlug, getServiceSlugs, getServices } from "@/lib/data-service";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return generatePageMetadata({
    title: service.title,
    description: `${service.shortDescription} Timberpark Pte. Ltd. offers professional ${service.title.toLowerCase()} across Singapore. Contact us for a free quote.`,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
  ]);

  if (!service) {
    notFound();
    return null;
  }

  const otherServices = allServices.filter((s) => s.slug !== slug);

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-8">
            <Link href="/" className="hover:text-brand-wood transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-brand-wood transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/70">{service.title}</span>
          </nav>

          <div className="flex items-start gap-6">

            <div>
              <h1 className="text-fluid-h2 font-semibold md:font-bold text-white mb-3 tracking-[-0.03em] leading-[1.1]">
                {service.title}
              </h1>
              <p className="text-white/70 text-base md:text-lg font-normal leading-relaxed tracking-tight">{service.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-brand-cream py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-fluid-h3 font-semibold text-brand-dark mb-6 tracking-tight">
                About Our <span className="text-brand-wood">{service.title}</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-10 text-base font-normal">
                {service.fullDescription}
              </p>

              <h3 className="text-base font-semibold text-brand-dark tracking-tight mb-5">
                What&apos;s Included
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 bg-white p-4 border border-gray-100">
                    <span className="w-2 h-2 bg-brand-wood flex-shrink-0" />
                    <span className="text-sm font-normal text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button href="/contact" variant="primary" size="lg" arrow id={`service-${slug}-get-quote`}>
                Get a Free Quote
              </Button>
            </div>

            {/* Sidebar */}
            <div>
              {/* Other services */}
              <div className="bg-brand-dark p-7 mb-6">
                <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-5">
                  Other Services
                </h3>
                <ul className="space-y-3">
                  {otherServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-3 text-white/70 hover:text-brand-wood transition-colors text-sm font-normal"
                      >
                        <span className="w-1.5 h-1.5 bg-brand-wood flex-shrink-0" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick contact */}
              <div className="bg-brand-wood p-7 text-white">
                <h3 className="font-bold text-xs tracking-widest uppercase mb-3">
                  Get in Touch
                </h3>
                <p className="text-white/80 text-sm mb-5">
                  Ready to start your project? Contact us for a free, no-obligation quote.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-white text-sm font-semibold">
                    <svg className="w-4 h-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+6584245286" className="hover:text-brand-wood transition-colors">
                        +65 8424 5286
                      </a>
                      <a href="tel:+6581452034" className="hover:text-brand-wood transition-colors">
                        +65 8145 2034
                      </a>
                    </div>
                  </div>
                  <a href="mailto:timberpark4@gmail.com" className="flex items-center gap-2 text-white text-sm font-semibold">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    timberpark4@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
