"use client";
import { ArrowRight, Sparkles, BarChart3, Target, Shield, Zap, Box, Activity } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function LandingPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="relative min-h-screen bg-bg-base text-text-primary font-sans selection:bg-text-contrast/10 selection:text-text-contrast overflow-hidden">
      
      {/* Ultra-subtle background noise/grain & grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      {/* Sleek, minimal floating nav */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full max-w-3xl items-center justify-between px-2 py-2 border border-text-contrast/5 bg-bg-surface/60 backdrop-blur-xl rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
        >
          <Link href="/" className="flex items-center gap-2 pl-4 cursor-pointer group">
            <div className="w-5 h-5 rounded-full bg-text-contrast flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
              <div className="w-2 h-2 rounded-full bg-bg-base"></div>
            </div>
            <span className="font-heading text-[15px] font-medium tracking-tight text-text-contrast pt-0.5">GrowthOS</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 pl-4">
            {["Case Studies", "Features", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-[13px] font-medium text-text-secondary transition-colors hover:text-text-contrast"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden sm:inline-flex px-4 py-2 text-[13px] font-medium text-text-contrast transition-opacity hover:opacity-70">
              Log in
            </Link>
            <Link href="/onboarding" className="inline-flex items-center justify-center h-9 px-5 rounded-full bg-text-contrast text-bg-base text-[13px] font-semibold transition-transform hover:scale-105 duration-300">
              Get access
            </Link>
          </div>
        </motion.nav>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 pt-32 md:pt-56 pb-16 md:pb-24">
        
        {/* HERO SECTION */}
        <section className="text-center flex flex-col items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="flex flex-col items-center w-full"
          >
            <motion.div variants={itemVariants} className="mb-8 flex items-center gap-2.5 rounded-full border border-text-contrast/10 bg-text-contrast/5 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-text-contrast/80">Available now</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-6xl sm:text-7xl md:text-8xl font-medium tracking-tighter text-text-contrast leading-[0.95] max-w-4xl"
            >
              Stop buying fake followers.<br />
              <span className="text-text-contrast/40">Start engineering reach.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-lg text-[16px] sm:text-[18px] text-text-secondary leading-relaxed font-normal"
            >
              AI-powered content intelligence modeling your past performance via the Meta API to dictate what, when, and how you publish.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link href="/onboarding" className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-text-contrast px-8 text-[14px] font-semibold text-bg-base transition-all hover:bg-text-contrast/90 shadow-[0_0_24px_rgba(255,255,255,0.2)]">
                Start building
                <ArrowRight size={16} />
              </Link>
              <button className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-text-contrast/10 bg-transparent px-8 text-[14px] font-semibold text-text-contrast transition-all hover:bg-text-contrast/5">
                View platform
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* MINIMAL ABSTRACT UI SHOWCASE */}
        <motion.section 
          id="platform"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-32 relative w-full"
        >
          {/* Subtle gradient glow behind the mockup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] bg-text-contrast/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-3xl sm:rounded-[40px] border border-text-contrast/10 bg-bg-surface/50 p-3 sm:p-5 backdrop-blur-xl shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent z-20 pointer-events-none"></div>
            
            <div className="w-full h-full rounded-[24px] rounded-t-xl sm:rounded-t-[28px] border border-text-contrast/5 bg-bg-raised shadow-inner relative flex flex-col overflow-hidden">
               {/* Browser Tabs */}
               <div className="h-12 border-b border-text-contrast/5 flex items-center px-4 md:px-6 gap-6 relative z-10">
                 <div className="flex gap-1.5 shrink-0">
                   <div className="w-2.5 h-2.5 rounded-full bg-text-contrast/20"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-text-contrast/20"></div>
                 </div>
                 <div className="flex items-center gap-4 text-[12px] font-medium text-text-secondary w-full overflow-x-auto whitespace-nowrap no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <span className="text-text-contrast">Overview</span>
                    <span>Audience</span>
                    <span>Content</span>
                 </div>
               </div>

               {/* UI Skeleton */}
               <div className="flex-1 p-6 sm:p-10 flex flex-col gap-8 relative z-10">
                  <div className="w-full h-auto flex flex-col sm:flex-row items-end justify-between gap-6">
                    <div>
                      <div className="text-[12px] text-text-secondary font-medium mb-2 uppercase tracking-wider">Total Reach</div>
                      <div className="text-4xl sm:text-5xl font-heading font-medium text-text-contrast tracking-tighter">2,492,000</div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                       <div className="h-8 flex-1 sm:w-24 rounded-lg bg-text-contrast/5 border border-text-contrast/5"></div>
                       <div className="h-8 flex-1 sm:w-24 rounded-lg bg-text-contrast/5 border border-text-contrast/5"></div>
                    </div>
                  </div>

                  <div className="flex-1 rounded-2xl border border-text-contrast/5 bg-bg-surface flex items-end p-6 gap-2 relative overflow-hidden">
                    {/* Minimalist Chart Bars */}
                    {[40, 55, 30, 70, 45, 80, 60, 95, 85, 100, 75, 50, 65, 90, 80].map((h, i) => (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1.5, delay: 1 + (i * 0.05), ease: "easeOut" }}
                        key={i} 
                        className="flex-1 bg-text-contrast/10 rounded-t border-t border-text-contrast/20 transition-colors group-hover:bg-text-contrast/20"
                      ></motion.div>
                    ))}

                    <div className="absolute inset-0 bg-gradient-to-t from-bg-surface to-transparent opacity-80 pointer-events-none"></div>
                  </div>
               </div>
            </div>
          </div>
        </motion.section>

        {/* CASE STUDIES */}
        <section id="case-studies" className="mt-24 md:mt-40">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-text-contrast mb-4">Proven scale.<br /><span className="text-text-secondary">Real creators.</span></h2>
              <p className="text-[16px] text-text-secondary max-w-md">See how top creators and agencies are using our predictive models to dominate their niches.</p>
            </div>
            <button className="hidden md:inline-flex items-center gap-2 text-[14px] font-medium text-text-contrast hover:text-text-contrast/70 transition-colors group">
              View all results <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group rounded-3xl border border-text-contrast/10 bg-bg-surface/50 p-8 flex flex-col justify-between min-h-[320px] md:min-h-0 md:h-[420px] backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-text-contrast/20 hover:-translate-y-1">
               <div className="absolute inset-0 bg-gradient-to-br from-text-contrast/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               <div className="relative z-10">
                  <div className="text-text-contrast/50 text-[11px] font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Case Study 01
                  </div>
                  <div className="text-2xl font-heading text-text-contrast leading-tight">Grew purely organic reach by 400% in 12 weeks.</div>
               </div>
               <div className="relative z-10 flex flex-col gap-6 border-t border-text-contrast/10 pt-6 mt-auto">
                  <div className="flex items-end gap-2">
                     <span className="text-4xl sm:text-5xl font-medium text-text-contrast tracking-tighter w-full mb-1">+400%</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-text-contrast/10 flex items-center justify-center text-[10px] text-text-contrast/50">C1</div>
                     <div>
                       <div className="text-[13px] font-medium text-text-contrast">@creator_one</div>
                       <div className="text-[11px] text-text-secondary">Lifestyle Niche</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="group rounded-3xl border border-text-contrast/10 bg-bg-surface/50 p-8 flex flex-col justify-between min-h-[320px] md:min-h-0 md:h-[420px] backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-text-contrast/20 hover:-translate-y-1 md:-translate-y-4">
               <div className="absolute inset-0 bg-gradient-to-br from-[#0077FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               <div className="relative z-10">
                  <div className="text-[#0077FF]/70 text-[11px] font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0077FF] animate-pulse"></span>
                    Case Study 02
                  </div>
                  <div className="text-2xl font-heading text-text-contrast leading-tight">Escaped algorithmic penalty and reached 1M accounts.</div>
               </div>
               <div className="relative z-10 flex flex-col gap-6 border-t border-text-contrast/10 pt-6 mt-auto">
                  <div className="flex items-end gap-2">
                     <span className="text-4xl sm:text-5xl font-medium text-text-contrast tracking-tighter w-full mb-1">1.2M</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-[#0077FF]/20 flex items-center justify-center text-[10px] text-[#0077FF]">AB</div>
                     <div>
                       <div className="text-[13px] font-medium text-text-contrast">@agency_brand</div>
                       <div className="text-[11px] text-text-secondary">Marketing Agency</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="group rounded-3xl border border-text-contrast/10 bg-bg-surface/50 p-8 flex flex-col justify-between min-h-[320px] md:min-h-0 md:h-[420px] backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-text-contrast/20 hover:-translate-y-1">
               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               <div className="relative z-10">
                  <div className="text-purple-500/70 text-[11px] font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    Case Study 03
                  </div>
                  <div className="text-2xl font-heading text-text-contrast leading-tight">Doubled engagement rate without changing content type.</div>
               </div>
               <div className="relative z-10 flex flex-col gap-6 border-t border-text-contrast/10 pt-6 mt-auto">
                  <div className="flex items-end gap-2">
                     <span className="text-4xl sm:text-5xl font-medium text-text-contrast tracking-tighter w-full mb-1">2.1x</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] text-purple-400">P3</div>
                     <div>
                       <div className="text-[13px] font-medium text-text-contrast">@podcast_clips</div>
                       <div className="text-[11px] text-text-secondary">Entertainment</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
          
          <button className="md:hidden mt-8 w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-text-contrast/10 text-[14px] font-medium text-text-contrast transition-colors hover:bg-text-contrast/5 group">
            View all results <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </section>

        {/* FEATURES - MINIMAL LIST */}
        <section id="features" className="mt-24 md:mt-40 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
          <div className="md:col-span-2 mb-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-text-contrast mb-4">Focus on the signal.<br /><span className="text-text-secondary">Ignore the noise.</span></h2>
          </div>

          {[
            { icon: Activity, title: "Predictive Windows", desc: "Our models analyze your account's historical heartbeat to predict optimal posting times down to the minute. No more guessing when your audience is awake." },
            { icon: Shield, title: "Niche Protection", desc: "Meta categorizes accounts strictly. We read your data to alert you when your content strays off-niche, preventing algorithmic deprioritization." },
            { icon: Zap, title: "Algorithmic Scoring", desc: "Score your caption and hooks before you publish. We rate your draft against competitive baselines and suggest immediate changes for reach velocity." },
            { icon: Box, title: "Gap Intel", desc: "We track your closest competitors and instantly map out the specific content formats they are succeeding with that you have completely ignored." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-start group">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-text-contrast/5 border border-text-contrast/10 transition-colors group-hover:bg-text-contrast group-hover:text-bg-base text-text-contrast">
                <feature.icon size={18} strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 font-heading text-lg font-medium text-text-contrast tracking-tight">{feature.title}</h3>
              <p className="text-[15px] leading-relaxed text-text-secondary">{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* PRICING */}
        <section id="pricing" className="mt-24 md:mt-40">
          <div className="mb-12 text-center md:text-left">
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-text-contrast mb-4">Simple infrastructure.<br /><span className="text-text-secondary">One flat rate.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="flex flex-col justify-between rounded-3xl border border-text-contrast/10 bg-bg-surface/50 p-8 backdrop-blur-xl hover:border-text-contrast/20 transition-colors">
              <div>
                <h3 className="text-xl font-heading text-text-contrast mb-2">Starter</h3>
                <p className="text-[14px] text-text-secondary leading-relaxed mb-6">Essential tools to jumpstart your organic growth.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-heading font-medium text-text-contrast tracking-tighter">$29</span>
                  <span className="text-[14px] text-text-secondary">/mo</span>
                </div>
                <div className="flex flex-col gap-3 mb-8">
                   {["Smart posting windows", "Basic analytics tracking", "Standard community support"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[14px] text-text-contrast/70">
                         <div className="w-1.5 h-1.5 rounded-full bg-text-contrast/50"></div>
                         {item}
                      </div>
                   ))}
                </div>
              </div>
              <Link href="/onboarding" className="w-full inline-flex h-12 items-center justify-center rounded-full border border-text-contrast/10 bg-transparent text-[14px] font-medium text-text-contrast transition-all hover:bg-text-contrast/5 hover:border-text-contrast/20">
                 Start Starter
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-text-contrast/30 bg-text-contrast/5 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.05)]">
              <div className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-text-contrast px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-bg-base">Most Popular</div>
              <div>
                <h3 className="text-xl font-heading text-text-contrast mb-2">Pro</h3>
                <p className="text-[14px] text-text-secondary leading-relaxed mb-6">Full access to the predictive engine and AI scoring.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-heading font-medium text-text-contrast tracking-tighter">$79</span>
                  <span className="text-[14px] text-text-secondary">/mo</span>
                </div>
                <div className="flex flex-col gap-3 mb-8">
                   {["Predictive posting windows", "Unlimited algorithmic scoring", "Competitor gap analysis", "Premium 24/7 support"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[14px] text-text-contrast/90">
                         <div className="w-1.5 h-1.5 rounded-full bg-text-contrast"></div>
                         {item}
                      </div>
                   ))}
                </div>
              </div>
              <Link href="/onboarding" className="w-full inline-flex h-12 items-center justify-center rounded-full bg-text-contrast text-[14px] font-semibold text-bg-base transition-all hover:bg-text-contrast/90">
                 Start Pro free
              </Link>
            </div>

            {/* Scale Plan */}
            <div className="flex flex-col justify-between rounded-3xl border border-text-contrast/10 bg-bg-surface/50 p-8 backdrop-blur-xl hover:border-text-contrast/20 transition-colors">
              <div>
                <h3 className="text-xl font-heading text-text-contrast mb-2">Scale</h3>
                <p className="text-[14px] text-text-secondary leading-relaxed mb-6">Designed for agencies and high-volume creators.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-heading font-medium text-text-contrast tracking-tighter">$149</span>
                  <span className="text-[14px] text-text-secondary">/mo</span>
                </div>
                <div className="flex flex-col gap-3 mb-8">
                   {["Everything in Pro", "Manage up to 5 accounts", "Custom API access", "Dedicated success manager"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[14px] text-text-contrast/70">
                         <div className="w-1.5 h-1.5 rounded-full bg-text-contrast/50"></div>
                         {item}
                      </div>
                   ))}
                </div>
              </div>
              <button className="w-full inline-flex h-12 items-center justify-center rounded-full border border-text-contrast/10 bg-transparent text-[14px] font-medium text-text-contrast transition-all hover:bg-text-contrast/5 hover:border-text-contrast/20">
                 Contact Sales
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* MINIMAL FOOTER */}
      <footer id="company" className="mt-24 md:mt-32 border-t border-text-contrast/5 bg-bg-raised relative z-10">
        <div className="mx-auto max-w-5xl px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-text-contrast flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-bg-base"></div>
            </div>
            <span className="font-heading text-[14px] font-medium text-text-contrast">GrowthOS</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-8 text-[13px] font-medium text-text-secondary">
            <Link href="/contact" className="hover:text-text-contrast transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-text-contrast transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-text-contrast transition-colors">Terms & Conditions</Link>
            <Link href="/refund" className="hover:text-text-contrast transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
