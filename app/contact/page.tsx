"use client";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary font-sans selection:bg-text-contrast/10 selection:text-text-contrast">
      {/* Sleek, minimal floating nav */}
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

      <main className="relative z-10 mx-auto max-w-2xl px-6 pt-40 pb-24">
        <h1 className="font-heading text-4xl sm:text-5xl font-medium tracking-tight text-text-contrast mb-6">Contact Us</h1>
        <p className="text-[16px] text-text-secondary mb-12">
          Have questions about GrowthOS or need technical support? We're here to help. Fill out the form below or reach us directly at <a href="mailto:support@growthos.com" className="text-text-contrast hover:underline">support@growthos.com</a>.
        </p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[13px] font-medium text-text-contrast/80">Full Name</label>
              <input 
                id="name" 
                type="text" 
                placeholder="Jamie Doe" 
                className="w-full h-12 rounded-xl bg-text-contrast/5 border border-text-contrast/10 px-4 text-text-contrast text-[14px] focus:outline-none focus:border-text-contrast/30 focus:bg-text-contrast/10 transition-colors"
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-[13px] font-medium text-text-contrast/80">Email Address</label>
              <input 
                id="email" 
                type="email" 
                placeholder="jamie@example.com" 
                className="w-full h-12 rounded-xl bg-text-contrast/5 border border-text-contrast/10 px-4 text-text-contrast text-[14px] focus:outline-none focus:border-text-contrast/30 focus:bg-text-contrast/10 transition-colors"
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="text-[13px] font-medium text-text-contrast/80">Subject</label>
            <input 
              id="subject" 
              type="text" 
              placeholder="How can we help?" 
              className="w-full h-12 rounded-xl bg-text-contrast/5 border border-text-contrast/10 px-4 text-text-contrast text-[14px] focus:outline-none focus:border-text-contrast/30 focus:bg-text-contrast/10 transition-colors"
              required 
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-[13px] font-medium text-text-contrast/80">Message</label>
            <textarea 
              id="message" 
              rows={5}
              placeholder="Provide as much detail as possible..." 
              className="w-full rounded-xl bg-text-contrast/5 border border-text-contrast/10 p-4 text-text-contrast text-[14px] focus:outline-none focus:border-text-contrast/30 focus:bg-text-contrast/10 transition-colors resize-none"
              required 
            ></textarea>
          </div>

          <button type="submit" className="h-12 w-full rounded-xl bg-text-contrast text-bg-base text-[14px] font-semibold hover:bg-text-contrast/90 transition-colors mt-8">
            Send Message
          </button>
        </form>
      </main>

      <footer className="mt-20 border-t border-text-contrast/5 bg-bg-raised relative z-10">
        <div className="mx-auto max-w-5xl px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-text-contrast flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-bg-base"></div>
            </div>
            <span className="font-heading text-[14px] font-medium text-text-contrast">GrowthOS</span>
          </div>
          <div className="text-[13px] text-text-secondary">
            &copy; {new Date().getFullYear()} GrowthOS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
