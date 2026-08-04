import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";
import { AnimatedPageHero } from "@/components/ui/AnimatedPageHero";
import { getSiteConfig } from "@/lib/data-service";
import { generatePageMetadata } from "@/lib/seo";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { StatIcon } from "@/components/ui/StatIcon";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about Timberpark Pte. Ltd. at Singapore's trusted construction and renovation company. Our mission, vision, history and values since 2021.",
  path: "/about",
});

export default async function AboutPage() {
  const config = await getSiteConfig();
  const { about, contact, stats, uen, yearFounded } = config;

  return (
    <>
      {/* Page Hero */}
      <AnimatedPageHero
        title={"Building Your Vision With\nExpertise and Integrity."}
        highlightWord="Expertise"
        description={about.body}
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "ABOUT US" }
        ]}
      />

      {/* Stats */}
      <section className=" py-0">
        <div className="relative z-10 bg-black backdrop-blur-sm border-t border-white/10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/15">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-4 lg:px-6 xl:px-8 justify-start"
              >
                {/* Custom icon image */}
                <div className="flex-shrink-0">
                  <StatIcon index={i} />
                </div>

                {/* Text section */}
                <div className="flex flex-col justify-center text-left flex-1 min-w-0">
                  <p className="text-left text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-[-0.03em] leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-left text-white/70 text-xs tracking-tight font-medium leading-snug">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-brand-cream py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-wood mb-3">Our Foundation</p>
              <h2 className="text-fluid-h2 font-semibold md:font-bold text-brand-dark mb-8 tracking-[-0.03em]">
                Mission, Vision & <span className="text-brand-wood">Values</span>
              </h2>

              <div className="space-y-6">
                <div className="p-6 bg-white border-l-4 border-brand-wood shadow-card">
                  <h3 className="font-semibold text-brand-dark tracking-tight text-sm mb-2">Our Mission</h3>
                  <p className="text-gray-600 text-sm font-normal leading-relaxed">{about.mission}</p>
                </div>
                <div className="p-6 bg-white border-l-4 border-brand-wood shadow-card">
                  <h3 className="font-semibold text-brand-dark tracking-tight text-sm mb-2">Our Vision</h3>
                  <p className="text-gray-600 text-sm font-normal leading-relaxed">{about.vision}</p>
                </div>
                <div className="p-6 bg-white border-l-4 border-brand-woodLight shadow-card">
                  <h3 className="font-semibold text-brand-dark tracking-tight text-sm mb-2">Our Values</h3>
                  <ul className="text-gray-600 text-sm font-normal space-y-1.5">
                    {["Quality in every detail", "Integrity in every commitment", "Innovation in every solution", "Safety above all else"].map((v) => (
                      <li key={v} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-wood flex-shrink-0" />
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Image + Company Info */}
            <div className="space-y-8">
              <div className="relative h-72 md:h-96 overflow-hidden">
                <Image
                  src="/images/about-interior.jpg"
                  alt="Timberpark interior renovation work"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Company details */}
              <div className="bg-brand-dark p-8 text-white">
                <h3 className="font-semibold text-xs tracking-wider uppercase text-brand-wood mb-5">
                  Company Information
                </h3>
                <dl className="space-y-3">
                  {[
                    { label: "Company Name", value: config.companyName },
                    { label: "UEN / Reg. No.", value: uen },
                    { label: "Incorporation Date", value: config.incorporationDate },
                    { label: "Primary Activity", value: config.businessActivities.primary },
                    { label: "Secondary Activity", value: config.businessActivities.secondary },
                    { label: "Office Address", value: contact.address },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                      <dt className="text-white/40 text-xs tracking-tight min-w-[140px]">{label}</dt>
                      <dd className="text-white/80 text-sm font-normal">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
