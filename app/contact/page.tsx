import { ContactForm } from "@/components/sections/ContactForm";
import { getSiteConfig } from "@/lib/data-service";
import { generatePageMetadata, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";
import type { Metadata } from "next";
import { AnimatedPageHero } from "@/components/ui/AnimatedPageHero";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us",
  description:
    "Contact Timberpark Pte. Ltd. for a free construction or renovation quote in Singapore. Call +91 82177 50424 or email timberpark4@gmail.com.",
  path: "/contact",
  keywords: ["contact Timberpark", "renovation quote singapore", "construction consultation"],
});

export default async function ContactPage() {
  const config = await getSiteConfig();
  const { contact } = config;

  const webPageSchema = generateWebPageSchema("Contact Us", metadata.description as string, "/contact");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([webPageSchema, breadcrumbSchema]) }} />
      {/* Hero */}
      <AnimatedPageHero
        title={"Let's Build Something\nGreat Together"}
        highlightWord="Great Together"
        description="Get in touch for a free, no-obligation consultation and quotation. We typically respond within 1 business day."
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "CONTACT US" }
        ]}
      />

      {/* Contact content */}
      <section className="bg-brand-cream py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-wood mb-3">
                  Get in Touch
                </p>
                <h2 className="text-fluid-h3 font-semibold text-brand-dark mb-4 tracking-tight">
                  Contact Information
                </h2>
              </div>

              {/* Info cards */}
              {[
                {
                  id: "contact-phone",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: "Phone",
                  value: contact.phone,
                  href: `tel:${contact.phone.replace(/\s/g, "")}`,
                },
                {
                  id: "contact-email",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: "Email",
                  value: contact.email,
                  href: `mailto:${contact.email}`,
                },
                {
                  id: "contact-address",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: "Address",
                  value: contact.address,
                  href: "https://maps.google.com/?q=60+Paya+Lebar+Road+Singapore+409051",
                },
              ].map((item) => (
                <a
                  key={item.id}
                  id={item.id}
                  href={item.href}
                  target={item.href.startsWith("https") ? "_blank" : undefined}
                  rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 p-5 bg-white border border-gray-100 hover:border-brand-wood hover:shadow-card transition-all duration-200 group"
                >
                  <div className="text-brand-wood group-hover:scale-110 transition-transform duration-200 flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-gray-400 mb-1">{item.label}</p>
                    <p className="text-brand-dark text-sm font-normal">{item.value}</p>
                  </div>
                </a>
              ))}

              {/* Hours */}
              <div className="p-5 bg-brand-dark text-white">
                <p className="text-xs font-semibold tracking-wider uppercase text-brand-wood mb-3">Business Hours</p>
                <p className="text-white/80 text-sm font-normal">{contact.hours.weekdays}</p>
                <p className="text-white/80 text-sm font-normal mt-1">{contact.hours.saturday}</p>
                <p className="text-white/50 text-xs font-normal mt-3">Closed on Sundays & Public Holidays</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 md:p-10 border border-gray-100 shadow-card">
              <h2 className="text-xl font-semibold text-brand-dark mb-2 tracking-tight">Send Us a Message</h2>
              <p className="text-gray-500 text-sm font-normal mb-8">
                Fill in the form below and we&apos;ll get back to you with a free, no-obligation quotation.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-brand-cream pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden border border-gray-100 shadow-card p-2 bg-white">
            <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.775836932407!2d103.889396!3d1.326759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1820bdfbdf61%3A0x8e8334812a642e!2s60%20Paya%20Lebar%20Rd%2C%20Singapore%20409051!5e0!3m2!1sen!2ssg!4v1700000000000!5m2!1sen!2ssg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Timberpark Location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
