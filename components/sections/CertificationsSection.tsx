import Link from "next/link";
import Image from "next/image";

const CERTIFICATION_ICONS = [
  "https://res.cloudinary.com/defqgygsf/image/upload/v1785830661/6327_uwa04g.png",
  "https://res.cloudinary.com/defqgygsf/image/upload/v1785830917/2783_lw39br.png",
  "https://res.cloudinary.com/defqgygsf/image/upload/v1785830419/23_l3brqj.png",
  "https://res.cloudinary.com/defqgygsf/image/upload/v1785829964/2378_wewov9.png",
];

const cardsData = [
  {
    title: <>BCA REGISTERED<br />CONTRACTOR</>,
    desc: "Registered under multiple workheads for construction and related works.",
    badge: "7 WORKHEADS REGISTERED",
    icon: CERTIFICATION_ICONS[0],
  },
  {
    title: <>BCA LICENSED<br />BUILDER (GB2)</>,
    desc: "Licensed General Builder Class 2 by the Building and Construction Authority.",
    badge: "LICENSE NO. GB2",
    icon: CERTIFICATION_ICONS[1],
  },
  {
    title: <>GOVERNMENT<br />RECOGNISED</>,
    desc: "Compliant with BCA regulations and industry standards for quality and safety.",
    badge: "FULLY COMPLIANT",
    icon: CERTIFICATION_ICONS[2],
  },
  {
    title: <>CERTIFICATES<br />VALID TILL</>,
    desc: (
      <>
        <span className="text-brand-wood font-bold block mb-1">17 NOVEMBER 2026</span>
        All registrations and licenses are valid and up to date.
      </>
    ),
    badge: "VALID & ACTIVE",
    icon: CERTIFICATION_ICONS[3],
  },
];

export function CertificationsSection() {
  return (
    <section className="bg-[#f7f7f7] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-brand-wood text-xs md:text-sm font-semibold tracking-widest uppercase mb-2">
            Trusted & Certified
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4 tracking-wider uppercase">
            By BCA Singapore
          </h2>
          <div className="w-12 h-[2px] bg-brand-wood"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card, index) => (
            <div key={index} className="flex flex-col bg-[#fcfbf9] rounded-sm border border-brand-wood/15 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-8 flex-1 flex flex-col items-center text-center">
                
                {/* Fixed Container for Even Images */}
                <div className="w-28 h-28 flex items-center justify-center mb-6 relative">
                  <Image 
                    src={card.icon} 
                    alt="Certification Icon" 
                    fill
                    sizes="112px"
                    className="object-contain drop-shadow-sm"
                  />
                </div>

                <h3 className="text-base font-bold text-brand-dark leading-snug mb-4 tracking-wide uppercase">
                  {card.title}
                </h3>
                <div className="w-6 h-[2px] bg-brand-wood mb-4"></div>
                <div className="text-gray-600 text-xs leading-relaxed font-medium">
                  {card.desc}
                </div>
              </div>
              
              <div className="bg-[#efe5d6] py-3.5 text-center border-t border-brand-wood/10">
                <span className="text-[10px] font-bold text-brand-dark tracking-widest uppercase">
                  {card.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-10 flex justify-center">
          <Link 
            href="/certifications"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-brand-wood/40 text-brand-dark text-xs font-bold tracking-widest uppercase hover:border-brand-wood hover:bg-[#f4ebd9]/30 transition-colors rounded-sm group"
          >
            VIEW ALL CERTIFICATIONS
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}