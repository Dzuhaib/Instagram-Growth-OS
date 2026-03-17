"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Eye, EyeOff, Star, Quote, ChevronLeft, Instagram, Lock } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const REVIEWS = [
  {
    id: 1,
    text: "GrowthOS completely changed how I approach my content. The AI scoring is scary accurate.",
    author: "Sarah Jenkins",
    role: "Fitness Creator",
    rating: 5,
  },
  {
    id: 2,
    text: "Switched from manually tracking to this. In 3 months, my reach increased by 400%. Unreal.",
    author: "Marco Rossi",
    role: "Chef & Food Blogger",
    rating: 5,
  },
  {
    id: 3,
    text: "The best ROI I've ever seen on a tool. It pays for itself in just one viral reel.",
    author: "Alex Rivers",
    role: "Digital Nomad",
    rating: 5,
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen bg-white overflow-hidden selection:bg-accent-pink/10">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-pink/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Left Side: Brand Visual & Social Proof */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between p-16 overflow-hidden bg-bg-base/30">
        {/* Aesthetic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,15,30,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(10,15,30,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
        >
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] flex items-center justify-center transition-transform duration-500 group-hover:rotate-180 shadow-sm">
                <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
            </div>
            <span className="text-2xl font-heading font-black tracking-tighter text-text-contrast">GrowthOS</span>
          </Link>
        </motion.div>

        <div className="relative z-10 max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <Quote className="text-accent-pink/20" size={40} />
              <h2 className="text-3xl font-heading font-bold text-text-contrast leading-tight tracking-tight">
                {REVIEWS[currentReview].text}
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-accent-pink/10 border border-accent-pink/10 flex items-center justify-center text-lg font-bold text-accent-pink">
                  {REVIEWS[currentReview].author[0]}
                </div>
                <div>
                  <div className="text-[17px] font-bold text-text-contrast">{REVIEWS[currentReview].author}</div>
                  <div className="text-[14px] text-text-tertiary">{REVIEWS[currentReview].role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#FCAF45" className="text-[#FCAF45]" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2.5 mt-10">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentReview(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentReview ? 'w-9 bg-accent-pink' : 'w-1.5 bg-border-strong/40'}`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-text-tertiary opacity-70">
          <div className="flex items-center gap-2"><Lock size={12} /> Meta Verified</div>
          <div className="flex items-center gap-2"><Instagram size={12} /> Official API</div>
          <div className="ml-auto">© 2026 GrowthOS</div>
        </div>
      </div>

      {/* Right Side: Professional Login Form */}
      <div className="w-full lg:w-[540px] h-full bg-white border-l border-border-subtle flex items-center justify-center p-8 lg:p-12 xl:p-20 relative z-10">
        <div className="w-full max-w-sm">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-3xl font-heading font-black text-text-contrast mb-3 tracking-tighter">Sign In</h1>
              <p className="text-[16px] text-text-secondary leading-relaxed font-medium">Access your growth command center.</p>
            </div>

            <div className="space-y-5 mb-8">
              <div className="group">
                <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-text-tertiary mb-2.5 group-focus-within:text-accent-pink transition-colors">Business Email</label>
                <div className="relative">
                  <input 
                    className="w-full h-13 px-4 rounded-xl bg-bg-base border border-border-subtle text-text-contrast outline-none focus:border-accent-pink/40 focus:bg-white transition-all shadow-sm font-medium placeholder:text-text-tertiary/50" 
                    type="email" 
                    placeholder="name@company.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
              </div>

              <div className="group">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-text-tertiary group-focus-within:text-accent-pink transition-colors">Security Key</label>
                  <button className="text-[11px] font-bold uppercase tracking-widest text-accent-pink hover:text-accent-purple transition-colors">Forgot?</button>
                </div>
                <div className="relative">
                  <input 
                    className="w-full h-13 px-4 pr-12 rounded-xl bg-bg-base border border-border-subtle text-text-contrast outline-none focus:border-accent-pink/40 focus:bg-white transition-all shadow-sm font-medium placeholder:text-text-tertiary/50" 
                    type={showPw ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <button 
                    onClick={() => setShowPw(!showPw)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-contrast transition-colors"
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              className="group relative w-full h-13 rounded-xl bg-text-contrast text-white font-black text-[14px] uppercase tracking-wider overflow-hidden transition-all active:scale-[0.98] shadow-lg shadow-text-contrast/10 mb-4"
              onClick={() => router.push("/dashboard")}
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] transition-opacity" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,#bc1888_0%,#cc2366_25%,#dc2743_50%,#e6683c_75%,#f09433_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center justify-center gap-2 transition-colors">
                Initialize Dashboard <ArrowRight size={17} />
              </span>
            </button>

            <button
              className="flex w-full h-13 items-center justify-center gap-3 rounded-xl border border-border-subtle bg-white text-[14px] font-bold text-text-contrast transition-all hover:bg-bg-base hover:border-accent-pink hover:text-accent-pink active:scale-[0.98]"
              onClick={() => router.push("/onboarding?method=instagram")}
            >
              <Instagram size={20} className="text-accent-pink" />
              Login with Instagram
            </button>

            <div className="mt-10 pt-8 border-t border-border-subtle flex flex-col items-center gap-6">
               <p className="text-[14px] text-text-tertiary font-medium">
                Don't have a workspace?{" "}
                <Link href="/onboarding" className="font-bold text-text-contrast hover:text-accent-pink transition-colors">
                  Create Account
                </Link>
              </p>
              
              <div className="flex items-center gap-3">
                 <div className="h-px w-6 bg-border-subtle" />
                 <span className="text-[10px] uppercase font-bold tracking-widest text-text-tertiary">Trusted by 5,000+ creators</span>
                 <div className="h-px w-6 bg-border-subtle" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
