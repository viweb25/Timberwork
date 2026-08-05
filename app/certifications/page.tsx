import { generatePageMetadata, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AnimatedPageHero } from "@/components/ui/AnimatedPageHero";

export const metadata: Metadata = generatePageMetadata({
  title: "Certifications",
  description: "Timberpark Pte. Ltd. is registered and licensed with the Building and Construction Authority (BCA), demonstrating our commitment to quality, safety, and compliance.",
  path: "/certifications",
  keywords: ["BCA registered contractor", "licensed builder singapore", "construction safety certifications"],
});

// Icon Sizes increased to w-12 h-12 (or w-full h-full to fit parent)
const IconBuilding = (
  <img
    className="w-17 h-15"
    src="https://res.cloudinary.com/defqgygsf/image/upload/v1785319158/img21_t9jjeb.png"
    alt="Building Icon"
  />
);

const IconCrane = (
  <img
    className="w-17 h-15"
    src="https://res.cloudinary.com/dhbdnffla/image/upload/v1785827435/2367_i1atwt.png"
    alt="Crane Icon"
  />
);

const IconWorker = (
  <img
    className="w-17 h-15"
    src="https://res.cloudinary.com/dhbdnffla/image/upload/v1785827434/2387_xc0zfn.png"
    alt="Worker Icon"
  />
);

const IconHammer = (
  <img
    className="w-17 h-15"
    src="https://res.cloudinary.com/dhbdnffla/image/upload/v1785827703/238_avsjjj.png"
    alt="Hammer Icon"
  />
);

const IconFence = (
  <img
    className="w-17 h-15"
    src="https://res.cloudinary.com/dhbdnffla/image/upload/v1785827693/326_zbfb25.png"
    alt="Fence Icon"
  />
);

const IconInterior = (
  <img
    className="w-17 h-15"
    src="https://res.cloudinary.com/defqgygsf/image/upload/v1785317953/img32_nvjtmp.png"
    alt="Interior Icon"
  />
);

const IconPaint = (
  <img
    className="w-17 h-15"
    src="https://res.cloudinary.com/dhbdnffla/image/upload/v1785826533/38e_oypupx.png"
    alt="Paint Icon"
  />
);

const IconHouse = (
  <img
    className="w-17 h-15"
    src="https://res.cloudinary.com/defqgygsf/image/upload/v1785318768/img34_mst5kl.png"
    alt="House Icon"
  />
);

const IconCardHeader = (
  <img
    className="w-8 h-8 object-contain"
    src="https://res.cloudinary.com/defqgygsf/image/upload/v1785827982/328_nzunip.png"
    alt="Card Header Icon"
  />
);

const IconCheckmark = (
  <img
    className="w-10 h-10 object-contain"
    src="https://res.cloudinary.com/defqgygsf/image/upload/v1785319158/img21_t9jjeb.png"
    alt="Checkmark Icon"
  />
);

const IconArrowRight = (
  <img
    className="w-4 h-4"
    src={`data:image/svg+xml;utf8,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%23ffffff" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>'
    )}`}
    alt="Arrow Icon"
  />
);

const bcaRegisteredContractors = [
  { classification: "CW01 (C3)", description: "General Building", expiry: "1 November 2026", icon: IconBuilding },
  { classification: "CW02 (C3)", description: "Civil Engineering", expiry: "1 November 2026", icon: IconCrane },
  { classification: "CR01 (Single Grade)", description: "Minor Construction Works", expiry: "1 November 2026", icon: IconWorker },
  { classification: "CR03 (Single Grade)", description: "Demolition", expiry: "1 November 2026", icon: IconHammer },
  { classification: "CR04 (L1)", description: "Fencing & Ironworks", expiry: "1 November 2026", icon: IconFence },
  { classification: "CR06 (L1)", description: "Interior Decoration & Finishing Works", expiry: "1 November 2026", icon: IconInterior },
  { classification: "CR09 (L1)", description: "Repairs & Redecoration", expiry: "1 November 2026", icon: IconPaint },
];

const bcaLicensedBuilders = [
  { classification: "GB2", description: "General Builder Class 2", expiry: "17 November 2026", icon: IconHouse },
];

export default function CertificationsPage() {
  const webPageSchema = generateWebPageSchema("Certifications", metadata.description as string, "/certifications");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Certifications", url: "/certifications" },
  ]);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([webPageSchema, breadcrumbSchema]) }} />
      {/* Hero Section */}
      <AnimatedPageHero
        title={"CERTIFICATIONS &\nLICENSING"}
        highlightWord="LICENSING"
        description={
          <>
            <span className="font-semibold text-white">Timberpark Pte. Ltd.</span> is registered and licensed with the
            Building and Construction Authority (BCA), demonstrating our commitment to quality, safety, and compliance.
          </>
        }
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "CERTIFICATIONS" }
        ]}
      />  

      {/* Content Section */}
      <section className="bg-[#fcfaf8] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-3 tracking-tight">
              OUR <span className="text-brand-wood">BCA</span> CERTIFICATIONS
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-medium">
              Registered with the <span className="text-[#3b82f6]">Building and Construction Authority</span>
            </p>
          </div>

          <div className="space-y-8">
            {/* BCA REGISTERED CONTRACTORS CARD */}
            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-[0_4px_24px_rgb(0,0,0,0.03)] border border-gray-100">
              <div className="flex items-start gap-5 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  {IconCardHeader}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-brand-dark mb-1">BCA REGISTERED CONTRACTORS</h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Registered with the <span className="text-[#3b82f6]">Building and Construction Authority</span><br className="hidden md:block" /> under the following workheads.
                  </p>
                </div>
              </div>

              {/* Table header */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-wider uppercase px-4">
                <div className="col-span-4">CLASSIFICATION</div>
                <div className="col-span-5">DESCRIPTION</div>
                <div className="col-span-3">EXPIRY DATE</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100">
                {bcaRegisteredContractors.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:grid md:grid-cols-12 gap-4 py-5 md:py-6 md:items-center px-4 hover:bg-gray-50/50 transition-colors rounded-xl group">
                    <div className="col-span-4 flex items-center gap-4">
                      {/* Increased icon container size to w-16 h-16 */}
                      <div className="w-20 h-20 rounded-full border border-gray-100 bg-brand-cream/30 flex items-center justify-center shrink-0 text-brand-wood group-hover:bg-brand-cream transition-colors p-2">
                        {item.icon}
                      </div>
                      <span className="font-semibold text-brand-dark text-sm">{item.classification}</span>
                    </div>
                    <div className="col-span-5 text-sm text-gray-600 font-medium">{item.description}</div>
                    <div className="col-span-3 text-sm text-brand-wood font-semibold">{item.expiry}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* BCA LICENSED BUILDERS CARD */}
            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-[0_4px_24px_rgb(0,0,0,0.03)] border border-gray-100">
              <div className="flex items-start gap-5 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  {IconCardHeader}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-brand-dark mb-1">BCA LICENSED BUILDERS</h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Registered with the <span className="text-[#3b82f6]">Building and Construction Authority</span><br className="hidden md:block" /> under the following workheads.
                  </p>
                </div>
              </div>

              {/* Table header */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-wider uppercase px-4">
                <div className="col-span-4">CLASSIFICATION</div>
                <div className="col-span-5">DESCRIPTION</div>
                <div className="col-span-3">EXPIRY DATE</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100">
                {bcaLicensedBuilders.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:grid md:grid-cols-12 gap-4 py-5 md:py-6 md:items-center px-4 hover:bg-gray-50/50 transition-colors rounded-xl group">
                    <div className="col-span-4 flex items-center gap-4">
                      {/* Increased icon container size to w-16 h-16 */}
                      <div className="w-24 h-24 rounded-full border border-gray-100 bg-brand-cream/30 flex items-center justify-center shrink-0 text-brand-wood group-hover:bg-brand-cream transition-colors p-2">
                        {item.icon}
                      </div>
                      <span className="font-semibold text-brand-dark text-sm">{item.classification}</span>
                    </div>
                    <div className="col-span-5 text-sm text-gray-600 font-medium">{item.description}</div>
                    <div className="col-span-3 text-sm text-brand-wood font-semibold">{item.expiry}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Banner inside this section */}
            <div className="bg-[#2a2a2a] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-12 shadow-lg">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-6 text-center md:text-left">
                <div className="shrink-0 w-16 h-16 rounded-full border-2 border-brand-wood/30 flex items-center justify-center mt-1 md:mt-0 p-2">
                  {IconCheckmark}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm md:text-base mb-2 uppercase tracking-tight">Committed to Quality & Compliance</h4>
                  <p className="text-white/60 text-xs md:text-sm max-w-md leading-relaxed font-normal">
                    Our BCA certifications reflect our dedication to maintaining the highest standards in construction, safety, and professionalism.
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="shrink-0 border border-white/20 hover:border-brand-wood text-white text-xs font-bold tracking-widest uppercase px-6 py-3.5 rounded-md hover:bg-brand-wood transition-colors flex items-center gap-3"
              >
                GET A FREE QUOTE
                {IconArrowRight}
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}