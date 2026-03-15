import Link from "next/link";

export default function PrivacyPage() {
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
        <h1 className="font-heading text-4xl sm:text-5xl font-medium tracking-tight text-text-contrast mb-6">Privacy Policy</h1>
        <p className="text-[14px] text-text-secondary mb-12">Last updated: March 15, 2026</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-text-secondary">
          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">1. The Data We Collect</h2>
            <p>At GrowthOS, we collect minimal personal data to operate our service. This includes:</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, and authentication credentials.</li>
              <li><strong>Platform Data:</strong> Data fetched via official Meta APIs (such as follower metrics, engagement rates, and post content) explicitly authorized by you via OAuth.</li>
              <li><strong>Billing Information:</strong> Processed securely by Paddle. We do not store raw credit card information on our servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">2. How We Use Your Data</h2>
            <p>We use your platform data strictly to provide the predictive analysis and insights advertised. We do not sell your data to third parties, advertising companies, or any external brokers.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">3. Data Security</h2>
            <p>We implement strict row-level security policies and encrypt sensitive tokens at rest. Your data is housed securely on managed database infrastructure with high standard compliance.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">4. Third-Party Services</h2>
            <p>Our payment processing is handled independently by Paddle, meaning all checkout information is processed under Paddle's privacy policies. We also use secure connection protocols when communicating with Meta's servers.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">5. Your Rights</h2>
            <p>You have the right to request the export or deletion of your account and all associated data at any time. Simply un-link your Meta connection in settings and contact our support team for full record purging.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">6. Contacting Us</h2>
            <p>For data privacy queries, email us at <a href="mailto:privacy@growthos.com" className="text-text-contrast hover:underline">privacy@growthos.com</a> or via our <Link href="/contact" className="text-text-contrast hover:underline">Contact page</Link>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
