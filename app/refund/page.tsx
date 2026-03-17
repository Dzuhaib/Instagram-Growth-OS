import Link from "next/link";

export default function RefundPage() {
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
        <h1 className="font-heading text-4xl sm:text-5xl font-medium tracking-tight text-text-contrast mb-6">Refund Policy</h1>
        <p className="text-[14px] text-text-secondary mb-12">Last updated: March 15, 2026</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-text-secondary">
          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">Our Commitment</h2>
            <p>We want you to be completely satisfied with GrowthOS. Because we are a data analytics tool powered by your existing metrics, we believe the value of our software should be immediately apparent.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">14-Day Money-Back Guarantee</h2>
            <p>If you subscribe to GrowthOS and find that it does not fit your needs, we offer a &quot;no questions asked&quot; 14-day money-back guarantee for your first payment. If you wish to cancel within your first 14 days and get a refund, simply reach out to our team.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">Recurring Subscriptions</h2>
            <p>For ongoing monthly or annual subscriptions outside of the initial 14-day window, you can cancel at any time to prevent future billing. We do not provide prorated refunds for mid-billing cycle cancellations. You will retain access to your GrowthOS account until the end of your current paid billing period.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-text-contrast mb-4">How to Request a Refund</h2>
            <p>To initiate a refund, please contact us at <a href="mailto:support@growthos.com" className="text-text-contrast hover:underline">support@growthos.com</a> or via our <Link href="/contact" className="text-text-contrast hover:underline">Contact page</Link> from the email address registered to your account. Your payment is processed by our merchant of record, Paddle, meaning refunds will be securely routed back to your original payment method within 3-5 business days.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
