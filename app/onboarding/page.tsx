"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Instagram,
  Shield,
  Lock,
  Eye,
  BarChart2,
  Users,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [niche, setNiche] = useState("");
  const [connecting, setConnecting] = useState(false);
  const router = useRouter();

  const handleConnect = () => {
    setConnecting(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setConnecting(false);
      setStep(4);
    }, 2000);
  };

  const handleFinish = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex flex-col items-center justify-center p-4">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[var(--accent-pink)] opacity-5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[var(--accent-purple)] opacity-5 blur-[120px]"></div>
      </div>

      <div className="z-10 w-full max-w-xl">
        {/* Progress Dots */}
        <div className="mb-12 flex items-center justify-center gap-3">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-10 bg-accent-pink shadow-[0_0_10px_rgba(225,48,108,0.4)]"
                  : s < step
                  ? "w-2.5 bg-green opacity-80"
                  : "w-2.5 bg-bg-raised border border-border-subtle"
              }`}
            />
          ))}
        </div>

        <div className="surface-glass p-8 md:p-12 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-pink to-transparent opacity-50"></div>

          {/* Step 1: Welcome & Goal */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h1 className="mb-3 font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast text-center">
                Welcome to GrowthOS
              </h1>
              <p className="mb-10 text-[15px] leading-relaxed text-[var(--text-secondary)] text-center font-['Inter']">
                Stop guessing what works. Let AI analyze your exact audience and scale your reach automatically.
              </p>

              <label className="mb-4 block text-[13px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                What is your primary goal?
              </label>
              <div className="flex flex-col gap-3 mb-8">
                {["Increase Followers", "Boost Reel Views", "Drive Link Clicks", "Manage Client Accounts"].map((g) => (
                  <button
                    key={g}
                    className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                      goal === g
                        ? "border-accent-pink bg-accent-pink/5 text-text-contrast shadow-[0_0_15px_rgba(225,48,108,0.1)]"
                        : "border-border-subtle bg-bg-raised text-text-secondary hover:border-border-strong hover:bg-bg-overlay"
                    }`}
                    onClick={() => setGoal(g)}
                  >
                    <span className="font-semibold text-[15px] font-heading">{g}</span>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${goal === g ? "border-transparent bg-accent-pink text-white" : "border-border-strong"}`}>
                      {goal === g && <Check size={12} strokeWidth={3} />}
                    </div>
                  </button>
                ))}
              </div>

              <button
                className="w-full h-12 rounded-xl bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] text-white font-bold text-[15px] shadow-[0_4px_20px_rgba(225,48,108,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                disabled={!goal}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 2: Niche */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <button
                onClick={() => setStep(1)}
                className="mb-6 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-raised)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-overlay)] hover:text-text-contrast transition-colors"
              >
                <ArrowLeft size={16} />
              </button>

              <h1 className="mb-3 font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast">
                Define your Niche
              </h1>
              <p className="mb-8 text-[15px] leading-relaxed text-[var(--text-secondary)] font-['Inter']">
                AI categorizes content differently depending on your industry. Help us set the baseline.
              </p>

              <div className="mb-8">
                <input
                  type="text"
                  placeholder="E.g. Fitness coaching, SaaS, React Development..."
                  className="input-field h-14 text-[16px] bg-[var(--bg-raised)] shadow-inner"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="mb-8 flex flex-col gap-3">
                 <div className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] flex items-center gap-2">
                    <Sparkles size={14} className="text-accent-pink" /> Popular Categories
                 </div>
                <div className="flex flex-wrap gap-2">
                  {["Fitness", "Marketing", "SaaS", "Real Estate", "E-commerce", "Education"].map((n) => (
                    <button
                      key={n}
                      className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-raised)] px-4 py-2 text-[13px] font-semibold text-[var(--text-secondary)] transition-colors hover:border-accent-pink hover:text-text-contrast shadow-inner"
                      onClick={() => setNiche(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="w-full h-12 rounded-xl bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] text-white font-bold text-[15px] shadow-[0_4px_20px_rgba(225,48,108,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                disabled={!niche}
                onClick={() => setStep(3)}
              >
                Next Step <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 3: Connect Account */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center">
              <button
                onClick={() => setStep(2)}
                className="absolute left-8 top-8 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-raised)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-overlay)] hover:text-text-contrast transition-colors"
               >
                <ArrowLeft size={16} />
              </button>

              <div className="mx-auto mb-6 flex h-[80px] w-[80px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F56040] shadow-[0_0_30px_rgba(253,29,29,0.3)]">
                <Instagram size={40} color="white" />
              </div>

              <h1 className="mb-3 font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast">
                Connect Instagram
              </h1>
              <p className="mb-10 text-[15px] leading-relaxed text-[var(--text-secondary)] font-['Inter'] px-4">
                We need read-only access to your Meta Graph API to analyze your follower activity and post performance.
              </p>

              <div className="mb-8 flex flex-col gap-0 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-raised)] text-left shadow-inner">
                 <div className="px-5 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                    <span className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Permissions required</span>
                 </div>
                {[
                  { Icon: Eye, label: "Read your posts & captions", why: "To score your content and analyze hooks" },
                  { Icon: BarChart2, label: "View post insights", why: "To build your personal AI algorithm" },
                  { Icon: Users, label: "Read demographic data", why: "To find peak posting times" },
                ].map((perm, i) => (
                  <div key={i} className="flex items-start gap-4 border-b border-border-subtle p-5 last:border-0 hover:bg-bg-overlay transition-colors">
                    <div className="mt-0.5 rounded-full bg-accent-pink/10 p-2 border border-accent-pink/20">
                      <perm.Icon size={16} className="text-accent-pink" />
                    </div>
                    <div>
                      <div className="font-semibold text-[14px] text-text-contrast mb-0.5">{perm.label}</div>
                      <div className="text-[13px] text-[var(--text-tertiary)]">{perm.why}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-8 flex items-center justify-center gap-2 text-[12px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mx-auto">
                <Shield size={14} className="text-[var(--green)]" /> Official Meta API <span className="mx-2 opacity-30">|</span> <Lock size={14} /> 100% Read-Only
              </div>

              <button
                className="w-full h-12 rounded-xl bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] text-white font-bold text-[15px] shadow-[0_4px_20px_rgba(225,48,108,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                disabled={connecting}
                onClick={handleConnect}
              >
                {connecting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Connecting...
                  </>
                ) : (
                  <>
                    <Instagram size={18} /> Connect Account
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="animate-in zoom-in-95 duration-500 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--green-dim)] border-2 border-[var(--green)] shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <Check size={40} className="text-[var(--green)]" strokeWidth={3} />
              </div>
              <h1 className="mb-3 font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast">
                Account Connected
              </h1>
              <p className="mb-10 text-[15px] leading-relaxed text-[var(--text-secondary)] font-['Inter']">
                We're pulling your last 90 days of data. Your AI dashboard is ready.
              </p>

              <button
                className="w-full h-12 rounded-xl bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] text-white font-bold text-[15px] shadow-[0_4px_20px_rgba(225,48,108,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                onClick={handleFinish}
              >
                Go to Dashboard <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
