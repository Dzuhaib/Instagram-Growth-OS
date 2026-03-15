"use client";
import { useState } from "react";
import {
  Link as LinkIcon,
  Search,
  AlertTriangle,
  Zap,
  Target,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Copy,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function HookAnalyserPage() {
  const [hook, setHook] = useState("");
  const [analysing, setAnalysing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const runAnalysis = () => {
    if (!hook.trim()) return;
    setAnalysing(true);
    setResults(null);
    setTimeout(() => {
      setAnalysing(false);
      setResults({
        score: 42,
        label: "Weak",
        color: "var(--red)",
        issues: [
          "Uses a closed question ('Want to know how?'). This signals a pitch.",
          "Lacks a specific timeframe or outcome metric.",
          "Fails to introduce a 'curiosity gap' early enough.",
        ],
        variants: [
          {
            id: 1,
            type: "Outcome-Led",
            text: "How I added 1,400 followers in 7 days without posting daily.",
            reason: "Focuses on the end result and breaks a common belief.",
          },
          {
            id: 2,
            type: "Negative Pivot",
            text: "Stop trying to post 3x a day. It's killing your reach.",
            reason: "Agitation hooks perform 2.4x better than positive framing in educational niches.",
          },
          {
            id: 3,
            type: "Curiosity Gap",
            text: "The 'lazy' content strategy that outperforms 90% of creators.",
            reason: "Makes the viewer feel like they are missing out on a secret mechanism.",
          },
        ],
      });
    }, 2500);
  };

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2 flex items-center gap-2">
            <LinkIcon className="text-[var(--accent-cyan)]" size={28} /> Hook Analyser
          </h1>
          <p className="text-[15px] text-[var(--text-secondary)]">
            Test the first 3 seconds of your video or first line of your caption.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left Column: Input */}
        <div className="flex flex-col gap-6">
          <div className="surface-glass p-6 md:p-8">
            <h2 className="mb-6 font-['Outfit'] text-[18px] font-bold text-text-contrast flex items-center gap-2">
              <Sparkles size={18} className="text-[var(--accent-cyan)]" /> Test your hook
            </h2>

            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[var(--text-secondary)]">Hook Text</label>
              <textarea
                className="input-field min-h-[120px] bg-[var(--bg-raised)] font-['Inter'] leading-relaxed shadow-inner font-medium text-[15px] focus:bg-[var(--bg-surface)] focus:ring-1 focus:ring-[var(--accent-cyan)] focus:border-[var(--accent-cyan)]"
                placeholder="E.g. Want to know how to grow on Instagram?"
                value={hook}
                onChange={(e) => setHook(e.target.value)}
              />
            </div>

            <div className="mb-8 rounded-lg border border border-[rgba(0,229,255,0.15)] bg-gradient-to-r from-[var(--bg-raised)] to-[var(--bg-surface)] p-5 text-[13px] text-[var(--text-secondary)] leading-relaxed shadow-inner">
              <div className="mb-2 flex items-center gap-2 font-semibold text-text-contrast">
                <Target size={16} className="text-[var(--accent-cyan)]" /> The 3-Second Rule
              </div>
              The AI evaluates "Retention Probability". If your hook doesn't secure the viewer's attention in the first 3 seconds, they will swipe, telling the algorithm your content is low quality.
            </div>

            <button
              className="btn-accent w-full justify-center h-12 text-[15px] shadow-[0_0_20px_var(--accent-cyan-dim)]"
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
              <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-[var(--bg-raised)] border border-[var(--border-strong)] shadow-inner">
                <LinkIcon size={32} className="text-[var(--text-tertiary)]" />
              </div>
              <h3 className="mb-2 font-['Outfit'] text-[20px] font-bold text-text-contrast">Awaiting hook</h3>
              <p className="text-[14px] text-[var(--text-secondary)] max-w-[250px]">
                Paste your opening line to see if it will grab attention.
              </p>
            </div>
          )}

          {analysing && (
            <div className="surface-glass flex h-full min-h-[400px] flex-col items-center justify-center p-12 text-center">
              <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[var(--bg-raised)]"></div>
                <div className="absolute inset-0 rounded-full border-b-[3px] border-l-[3px] border-[var(--accent-cyan)] animate-spin" style={{ animationDuration: "1s" }}></div>
                <Sparkles size={28} className="text-[var(--accent-cyan)] animate-pulse" />
              </div>
              <div className="mb-2 font-['Outfit'] text-[20px] font-bold text-text-contrast">Scoring Hook...</div>
              <div className="text-[14px] text-[var(--text-secondary)] flex flex-col items-center justify-center gap-2 w-full mt-4">
                 <div className="w-[60%] h-1 bg-[var(--bg-raised)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent-cyan)] w-1/2 rounded-full animate-pulse transition-all"></div>
                 </div>
                 <span className="text-[11px] font-bold uppercase tracking-widest mt-1 opacity-50">Checking Curiosity Matrix</span>
              </div>
            </div>
          )}

          {results && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Main Score Card */}
              <div className="surface-glass p-6 text-center border-[var(--border-strong)] shadow-xl relative overflow-hidden group">
                {/* Diagonal Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[var(--bg-overlay)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
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
                 <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-raised)] px-5 py-4">
                  <h3 className="font-['Outfit'] text-[15px] font-bold text-text-contrast flex items-center gap-2">
                    <AlertTriangle size={16} className="text-[var(--amber)]" /> Critical Issues Found
                  </h3>
                </div>
                <div className="p-5">
                  <ul className="flex flex-col gap-4">
                    {results.issues.map((issue: string, i: number) => (
                      <li key={i} className="flex gap-3 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--red-dim)] text-[var(--red)] border border-[rgba(239,68,68,0.3)] mt-0.5">
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
                  <Sparkles size={16} className="text-[var(--accent-cyan)]" /> High-Retention Alternatives
                </h3>
                <div className="flex flex-col gap-4">
                  {results.variants.map((variant: any) => (
                    <div key={variant.id} className="surface-glass p-5 border border-[var(--border-subtle)] transition-all hover:border-[var(--border-strong)] relative group shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded bg-[var(--accent-cyan-dim)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--accent-cyan)] border border-[rgba(0,229,255,0.2)]">
                          {variant.type}
                        </span>
                        <button
                          onClick={() => handleCopy(variant.text, variant.id)}
                          className={`flex items-center gap-1.5 rounded border px-2 py-1 text-[11px] font-semibold transition-colors ${
                            copied === variant.id
                              ? "border-[rgba(16,185,129,0.3)] bg-[var(--green-dim)] text-[var(--green)]"
                              : "border-[var(--border-strong)] bg-[var(--bg-raised)] text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] hover:text-text-contrast"
                          }`}
                        >
                          {copied === variant.id ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                          {copied === variant.id ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <p className="mb-3 font-semibold text-text-contrast leading-relaxed font-['Inter'] text-[15px] pr-2">
                        "{variant.text}"
                      </p>
                      <div className="flex items-start gap-2 rounded bg-[var(--bg-raised)] border border-[var(--border-subtle)] p-3 text-[12px] text-[var(--text-secondary)] shadow-inner">
                        <Zap size={14} className="mt-0.5 shrink-0 text-[var(--amber)]" />
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
