import { AnimatedPageHero } from "@/components/ui/AnimatedPageHero";
import { generatePageMetadata, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms & Services",
  description: "Terms and Services for Timberpark Pte. Ltd.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  const webPageSchema = generateWebPageSchema("Terms & Services", metadata.description as string, "/terms-of-service");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Terms & Services", url: "/terms-of-service" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([webPageSchema, breadcrumbSchema]) }} />
      <AnimatedPageHero
        title={"Terms & Services"}
        highlightWord="Terms"
        description="Please read these terms and conditions carefully."
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "TERMS & SERVICES" }
        ]}
      />

      <section className="bg-brand-cream py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white p-8 md:p-12 shadow-card border-l-4 border-brand-woodLight">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 tracking-[-0.03em]">Terms & Services</h2>
            <div className="prose prose-sm md:prose-base max-w-none text-gray-600 space-y-6">
              
              <p className="font-semibold text-brand-dark">Timberpark Pte. Ltd.</p>

              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">1. Free Quotation</h3>
                <p>Timberpark provides free quotations for our construction and renovation services. The quotation will be based on the project requirements discussed with the customer.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">2. Free Site Visit</h3>
                <p>We provide a free site visit for assessment and discussion of the project requirements.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">3. Confirmation of Work</h3>
                <p>Work will only begin after the customer has confirmed the quotation and agreed to the scope of work, price, and terms.</p>
                <p>A written agreement or confirmation may be required before work starts.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">4. Payment Terms</h3>
                <p>The payment schedule will be clearly stated in the quotation or agreement.</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>An advance payment may be required before work starts.</li>
                  <li>Progress or remaining payments will be made according to the agreed payment schedule.</li>
                  <li>Final payment is due upon completion of the agreed work, subject to the agreed terms.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">5. Accepted Payment Methods</h3>
                <p>We accept:</p>
                <ul className="list-disc pl-5 space-y-2 mt-2 mb-4">
                  <li>Cash</li>
                  <li>Cheque</li>
                  <li>Bank transfer</li>
                  <li>Other payment methods approved by Timberpark</li>
                </ul>
                <p>All payments must be made to the official Timberpark Pte. Ltd. company account or an authorised company payment method.</p>
                <p>Customers are advised to keep their payment receipts or transaction records.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">6. Changes to the Work</h3>
                <p>Any changes or additional work requested after confirmation may result in additional costs and/or changes to the completion time.</p>
                <p>Additional work will be discussed and agreed with the customer before proceeding.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">7. Completion Time</h3>
                <p>The estimated completion time will be stated in the quotation or agreement where possible.</p>
                <p>Completion time may change due to site conditions, customer-requested changes, material availability, weather, or other circumstances beyond our reasonable control.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">8. Quality & Customer Satisfaction</h3>
                <p>Customer satisfaction is important to Timberpark.</p>
                <p>We will regularly check the work during the project to ensure that the agreed requirements and quality standards are being followed.</p>
                <p>If the customer has any concern about the work, please inform us as soon as possible so that we can review and address the matter.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">9. Final Inspection</h3>
                <p>After the agreed work is completed, the customer may inspect the work together with Timberpark.</p>
                <p>Any agreed outstanding items or reasonable defects identified during the inspection will be reviewed and addressed according to the agreement.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">10. Cancellation</h3>
                <p>Any cancellation of confirmed work will be subject to the terms stated in the quotation or agreement, including any reasonable costs already incurred for materials, labour, or other project expenses.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">11. Contact Us</h3>
                <p>For questions regarding our Terms & Services, please contact:</p>
                <div className="mt-4 p-5 bg-gray-50 border border-gray-100 rounded-lg">
                  <p className="font-semibold text-brand-dark">Timberpark Pte. Ltd.</p>
                  <p className="text-gray-600 mb-2">Singapore</p>
                  <p>Email: <a href="mailto:timberpark4@gmail.com" className="text-brand-wood font-medium hover:underline">timberpark4@gmail.com</a></p>
                  <p>Phone: <a href="tel:+6584245286" className="text-brand-wood font-medium hover:underline">+65 8424 5286</a></p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="italic text-sm text-gray-500">By confirming our quotation or agreement, the customer acknowledges and accepts these Terms & Services.</p>
                <p className="text-xs font-semibold bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap text-brand-dark">Last Updated: 4 September 2026</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
