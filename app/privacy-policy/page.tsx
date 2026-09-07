import { AnimatedPageHero } from "@/components/ui/AnimatedPageHero";
import { generatePageMetadata, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Timberpark Pte. Ltd.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const webPageSchema = generateWebPageSchema("Privacy Policy", metadata.description as string, "/privacy-policy");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy-policy" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([webPageSchema, breadcrumbSchema]) }} />
      <AnimatedPageHero
        title={"Privacy Policy"}
        highlightWord="Privacy"
        description="How we protect and handle your information."
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "PRIVACY POLICY" }
        ]}
      />

      <section className="bg-brand-cream py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white p-8 md:p-12 shadow-card border-l-4 border-brand-wood">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 tracking-[-0.03em]">Privacy Policy</h2>
            <div className="prose prose-sm md:prose-base max-w-none text-gray-600 space-y-4">
              <p>Timberpark Pte. Ltd. respects your privacy and keeps your personal information safe.</p>
              <p>When you contact us through our website, we may collect your name, phone number, email address, project details, and other information you provide.</p>
              <p>We use this information to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Respond to your enquiries</li>
                <li>Provide quotations</li>
                <li>Arrange site visits</li>
                <li>Provide our construction and renovation services</li>
                <li>Contact you about your project</li>
              </ul>
              <p>We will not sell or rent your personal information to other companies.</p>
              <p>We may share your information with our employees, contractors, or service providers only when necessary to provide our services or operate our business.</p>
              <p>We take reasonable steps to protect your information from unauthorised access or misuse.</p>
              <p>If you want to know what personal information we have about you, or if you want us to correct or remove your information, please contact us.</p>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="font-semibold text-brand-dark mb-2">For any privacy questions, please contact:</p>
                <div className="mt-4 p-5 bg-gray-50 border border-gray-100 rounded-lg">
                  <p className="font-semibold text-brand-dark">Timberpark Pte. Ltd.</p>
                  <p className="text-gray-600 mb-2">Singapore</p>
                  <p>Email: <a href="mailto:timberpark4@gmail.com" className="text-brand-wood font-medium hover:underline">timberpark4@gmail.com</a></p>
                  <p>Phone: <a href="tel:+6584245286" className="text-brand-wood font-medium hover:underline">+65 8424 5286</a></p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
