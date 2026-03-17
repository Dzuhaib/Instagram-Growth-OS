"use client";
import { useState, useEffect } from "react";
import {
  Link as LinkIcon,
  Search,
  AlertTriangle,
  Zap,
  Target,
  Sparkles,
  CheckCircle2,
  Copy,
  ShieldCheck,
} from "lucide-react";

export default function HookAnalyserPage() {
  const [hook, setHook] = useState("");
  const [analysing, setAnalysing] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    label: string;
    color: string;
    issues: string[];
    variants: Array<{ id: number; type: string; text: string; reason: string }>;
  } | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [niche, setNiche] = useState("");

  useEffect(() => {
    setNiche(localStorage.getItem("growth_os_niche") || "General");
  }, []);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const runAnalysis = async () => {
    if (!hook.trim()) return;
    setAnalysing(true);
    setResults(null);
    try {
      const response = await fetch("/api/analyze-hook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hook, niche }),
      });
      if (!response.ok) throw new Error("Failed to analyze hook");
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      alert("Error analyzing hook. Make sure your OpenAI API key is configured.");
    } finally {
      setAnalysing(false);
    }
  };

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2 flex items-center gap-2">
            <LinkIcon className="text-accent-pink" size={28} /> Hook Analyser
          </h1>
          <p className="text-[15px] text-(--text-secondary)">
            Test the first 3 seconds of your video or first line of your caption.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left Column: Input */}
        <div className="flex flex-col gap-6">
          <div className="surface-glass p-6 md:p-8">
            <h2 className="mb-6 font-['Outfit'] text-[18px] font-bold text-text-contrast flex items-center gap-2">
              <Sparkles size={18} className="text-accent-pink" /> Test your hook
            </h2>

            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-(--text-secondary)">Hook Text</label>
              <textarea
                className="input-field min-h-[120px] bg-bg-raised font-sans leading-relaxed shadow-inner font-medium text-[15px] focus:bg-bg-surface focus:ring-1 focus:ring-accent-pink focus:border-accent-pink"
                placeholder="E.g. Want to know how to grow on Instagram?"
                value={hook}
                onChange={(e) => setHook(e.target.value)}
              />
            </div>

            <div className="mb-8 rounded-lg border border-accent-pink/20 bg-gradient-to-r from-bg-raised to-bg-surface p-5 text-[13px] text-text-secondary leading-relaxed shadow-inner">
              <div className="mb-2 flex items-center gap-2 font-semibold text-text-contrast">
                <Target size={16} className="text-accent-pink" /> The 3-Second Rule
              </div>
              The AI evaluates "Retention Probability" for your <strong className="text-text-contrast">{niche}</strong> content. If your hook doesn't secure attention in 3s, they will swipe.
            </div>

            <button
              className="btn-accent w-full justify-center h-12 text-[15px] shadow-[0_4px_20px_rgba(225,48,108,0.2)]"
              onClick={runAnalysis}
              disabled={!hook.trim() || analysing}
            >
              {analysing ? (
                <><Search size={16} className="animate-pulse" /> Scanning Hook DB...</>
              ) : (
                <><Zap size={16} /> Predict Retention</>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Results */}
        <div>
          {!analysing && !results && (
            <div className="surface-glass flex h-full min-h-[400px] flex-col items-center justify-center p-12 text-center opacity-80">
              <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-bg-raised border border-border-strong shadow-inner">
                <LinkIcon size={32} className="text-(--text-tertiary)" />
              </div>
              <h3 className="mb-2 font-['Outfit'] text-[20px] font-bold text-text-contrast">Awaiting hook</h3>
              <p className="text-[14px] text-(--text-secondary) max-w-[250px]">
                Paste your opening line to see if it will grab attention.
              </p>
            </div>
          )}

          {analysing && (
            <div className="surface-glass flex h-full min-h-[400px] flex-col items-center justify-center p-12 text-center">
              <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-bg-raised"></div>
                <div className="absolute inset-0 rounded-full border-b-[3px] border-l-[3px] border-accent-pink animate-spin" style={{ animationDuration: "1s" }}></div>
                <Sparkles size={28} className="text-accent-pink animate-pulse" />
              </div>
              <div className="mb-2 font-['Outfit'] text-[20px] font-bold text-text-contrast">Scoring Hook...</div>
              <div className="text-[14px] text-(--text-secondary) flex flex-col items-center justify-center gap-2 w-full mt-4">
                 <div className="w-[60%] h-1 bg-bg-raised rounded-full overflow-hidden">
                    <div className="h-full bg-accent-pink w-1/2 rounded-full animate-pulse transition-all"></div>
                 </div>
                 <span className="text-[11px] font-bold uppercase tracking-widest mt-1 opacity-50">Checking Curiosity Matrix</span>
              </div>
            </div>
          )}

          {results && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Main Score Card */}
              <div className="surface-glass p-6 text-center border-border-strong shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-bg-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-2 flex h-24 w-24 items-center justify-center rounded-full border-4 shadow-inner" style={{ borderColor: results.color, backgroundColor: 'color-mix(in srgb, ' + results.color + ' 10%, var(--bg-surface)' }}>
                    <span className="font-['Outfit'] text-[40px] font-black leading-none text-text-contrast tracking-tighter" style={{ textShadow: `0 0 20px ${results.color}` }}>
                      {results.score}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-bold uppercase tracking-widest border" style={{ color: results.color, borderColor: results.color, backgroundColor: 'color-mix(in srgb, ' + results.color + ' 15%, transparent' }}>
                    <ShieldCheck size={14} /> {results.label} Hook
                  </div>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="surface-glass p-0 overflow-hidden">
                 <div className="border-b border-border-subtle bg-bg-raised px-5 py-4">
                  <h3 className="font-['Outfit'] text-[15px] font-bold text-text-contrast flex items-center gap-2">
                    <AlertTriangle size={16} className="text-amber" /> Critical Issues Found
                  </h3>
                </div>
                <div className="p-5">
                  <ul className="flex flex-col gap-4">
                    {results?.issues?.map((issue: string, i: number) => (
                      <li key={i} className="flex gap-3 text-[13.5px] leading-relaxed text-(--text-secondary)">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red/10 text-red border border-red/30 mt-0.5">
                          ×
                        </span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Replacements */}
              <div>
                <h3 className="mb-4 font-['Outfit'] text-[16px] font-bold text-text-contrast flex items-center gap-2 px-1">
                  <Sparkles size={16} className="text-accent-pink" /> AI Alternatives
                </h3>
                <div className="flex flex-col gap-4">
                  {results?.variants?.map((variant: any) => (
                    <div key={variant.id} className="surface-glass p-5 border border-border-subtle transition-all hover:border-border-strong relative group shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded bg-accent-pink/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-pink border border-accent-pink/20">
                          {variant.type}
                        </span>
                        <button
                          onClick={() => handleCopy(variant.text, variant.id)}
                          className={`flex items-center gap-1.5 rounded border px-2 py-1 text-[11px] font-semibold transition-colors ${
                            copied === variant.id
                              ? "border-green/30 bg-green/10 text-green"
                              : "border-border-strong bg-bg-raised text-text-primary hover:bg-bg-overlay hover:text-text-contrast"
                          }`}
                        >
                          {copied === variant.id ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                          {copied === variant.id ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <p className="mb-3 font-semibold text-text-contrast leading-relaxed font-['Inter'] text-[15px] pr-2">
                        "{variant.text}"
                      </p>
                      <div className="flex items-start gap-2 rounded bg-bg-raised border border-border-subtle p-3 text-[12px] text-(--text-secondary) shadow-inner">
                        <Zap size={14} className="mt-0.5 shrink-0 text-amber" />
                        <span className="font-medium leading-relaxed">{variant.reason}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
