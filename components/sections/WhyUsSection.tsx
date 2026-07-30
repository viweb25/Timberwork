import { SectionHeader } from "@/components/ui/SectionHeader";

const whyUsItems = [
  {
    id: "quality",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Quality Workmanship",
    description:
      "Every project is executed to the highest standards. We use quality materials, skilled tradespeople and rigorous quality checks at every stage.",
  },
  {
    id: "experience",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Proven Track Record",
    description:
      "Over 100 completed projects across residential, commercial and industrial sectors since 2021. Our track record speaks for itself.",
  },
  {
    id: "trust",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Trusted by Major Clients",
    description:
      "We have served Government agencies, JLL, HDB, and reputable developers — earning repeat business through reliability and integrity.",
  },
  {
    id: "safety",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Safety First",
    description:
      "BCA-compliant processes, rigorous site safety protocols and full insurance coverage on every project. Your site is in safe hands.",
  },
  {
    id: "transparent",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "Transparent Pricing",
    description:
      "No hidden costs. We provide clear, detailed quotations upfront so you can plan with confidence. What we quote is what you pay.",
  },
  {
    id: "ontime",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
      </svg>
    ),
    title: "On-Time Delivery",
    description:
      "We understand that delays cost money. Our project management discipline ensures milestones are met and projects are handed over on schedule.",
  },
];

export function WhyUsSection() {
  return (
    <section id="why-us" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Choose Us"
          heading="The Timberpark Difference"
          highlightWord="Timberpark"
          subheading="Six reasons Singapore homeowners and businesses trust us with their most important projects."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUsItems.map((item, index) => (
            <div
              key={item.id}
              id={`why-us-${item.id}`}
              className="group relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-brand-wood/40 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
            >
              {/* Ghost index number — same signature element as project cards */}
              <span className="pointer-events-none select-none absolute top-4 right-5 text-6xl font-extrabold text-brand-dark/[0.04] leading-none tracking-tighter">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-brand-wood/10 text-brand-wood flex items-center justify-center mb-6 group-hover:bg-brand-wood group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-brand-dark text-lg tracking-tight mb-3 group-hover:text-brand-wood transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Bottom accent bar on hover — subtle premium touch */}
              <div className="absolute bottom-0 left-0 h-1 bg-brand-wood w-0 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}