import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary font-sans selection:bg-text-contrast/10 selection:text-text-contrast">
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
        <nav className="flex w-full max-w-3xl items-center justify-between px-2 py-2 border border-text-contrast/5 bg-bg-surface/60 backdrop-blur-xl rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <Link href="/" className="flex items-center gap-2 pl-4 cursor-pointer group">
            <div className="w-5 h-5 rounded-full bg-text-contrast flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
              <div className="w-2 h-2 rounded-full bg-bg-base"></div>
            </div>
            <span className="font-heading text-[15px] font-medium tracking-tight text-text-contrast pt-0.5">GrowthOS</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="inline-flex px-4 py-2 text-[13px] font-medium text-text-contrast transition-opacity hover:opacity-70">
              Back to Home
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-40 pb-24">
        <h1 className="font-heading text-4xl sm:text-5xl font-medium tracking-tight text-text-contrast mb-6">Terms and Conditions</h1>
        <p className="text-[14px] text-text-secondary mb-12">Last updated: March 15, 2026</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-text-secondary">
          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">1. Introduction</h2>
            <p>Welcome to GrowthOS. By accessing or using our platform, you agree to be bound by these Terms and Conditions. Please read them carefully.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">2. Use of Services</h2>
            <p className="mb-4">Our services connect to official third-party APIs (including Meta's Graph API) to provide analytics. You agree to use these services only for lawful purposes and in accordance with these Terms.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You must not use GrowthOS to violate any laws in your jurisdiction.</li>
              <li>You must not exploit the service to spam or scrape data beyond the allowed API quotas.</li>
              <li>We reserve the right to suspend accounts that violate these guidelines.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">3. Subscriptions and Payments</h2>
            <p>GrowthOS is billed on a recurring monthly or annual basis depending on your selected plan. Payments are processed securely via our merchant of record, Paddle. Paddle acts as the reseller of GrowthOS, handling all taxes and compliance in your jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">4. Intellectual Property</h2>
            <p>The service and its original content, features, and functionality are and will remain the exclusive property of GrowthOS and its licensors.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">5. Limitation of Liability</h2>
            <p>In no event shall GrowthOS, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">6. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@growthos.com" className="text-text-contrast hover:underline">legal@growthos.com</a> or via our <Link href="/contact" className="text-text-contrast hover:underline">Contact page</Link>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
