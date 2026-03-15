"use client";
import { useState } from "react";
import { Target, MessageCircle, Link as LinkIcon, AlertTriangle, Image as ImageIcon, Zap, Sparkles, X, ChevronDown, ChevronUp, Copy, CheckCircle2 } from "lucide-react";

export default function ContentScorerPage() {
  const [caption, setCaption] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [analysing, setAnalysing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleScore = () => {
    if (!caption.trim() && !thumbnail) return;
    setAnalysing(true);
    setResults(null);
    setTimeout(() => {
      setAnalysing(false);
      setResults({
        hook: { score: 42, label: "Weak", color: "var(--red)" },
        dmShare: { score: 88, label: "Strong", color: "var(--green)" },
        niche: { score: 65, label: "Needs Work", color: "var(--amber)" },
        rewritten: "Want to lose fat but hate boring meals?\n\nI used to eat plain chicken and broccoli every day. I lost weight, but I was miserable.\n\nThen I learned how to track macros. Now I eat pizza twice a week and I'm leaner than ever.\n\nThe secret isn't restricting foods. It's managing your daily totals.\n\nIf you want my free guide to macro-friendly takeout, drop a 🍕 in the comments.",
      });
    }, 2800);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setThumbnail(e.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const ScoreRing = ({ score, color, icon: Icon, label, title }: any) => {
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="surface-glass p-6 text-center">
        <div className="relative mx-auto mb-4 h-[90px] w-[90px]">
          {/* Background Ring */}
          <svg className="h-full w-full rotate-[-90deg] transform">
            <circle cx="45" cy="45" r={radius} stroke="var(--border-strong)" strokeWidth="6" fill="none" />
            <circle
              cx="45" cy="45" r={radius} stroke={color} strokeWidth="6" fill="none"
              strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon size={24} color={color} />
          </div>
        </div>
        <div className="mb-1 font-['Outfit'] text-[24px] font-bold text-text-contrast leading-none">{score}</div>
        <div className="text-[13px] font-semibold tracking-wide uppercase" style={{ color }}>{label}</div>
        <div className="mt-2 text-[12px] text-[var(--text-tertiary)]">{title}</div>
      </div>
    );
  };

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2">Content Scorer</h1>
          <p className="text-[15px] text-[var(--text-secondary)]">Predict reach and engagement before you hit post.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left Column: Input */}
        <div className="flex flex-col gap-6">
          <div className="surface-glass p-6 md:p-8">
            <h2 className="mb-6 font-['Outfit'] text-[18px] font-bold text-text-contrast flex items-center gap-2">
              <MessageCircle size={18} className="text-[var(--text-secondary)]" /> Draft Your Post
            </h2>
            
            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[var(--text-secondary)]">Caption & Hook</label>
              <textarea
                className="input-field min-h-[160px] bg-bg-raised font-sans leading-relaxed shadow-inner focus:bg-bg-surface focus:ring-1 focus:ring-accent-pink focus:border-transparent transition-all"
                placeholder="Paste your caption here... The AI pays extra attention to the first 3 lines (the hook)."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label className="mb-3 block text-[13px] font-semibold text-[var(--text-secondary)]">Thumbnail text (Optional)</label>
              <div className="flex flex-col sm:flex-row gap-4">
                {thumbnail ? (
                  <div className="relative h-[120px] w-24 shrink-0 overflow-hidden rounded-lg border border-[var(--border-strong)]">
                    <img src={thumbnail} alt="Upload preview" className="h-full w-full object-cover" />
                    <button
                      onClick={() => setThumbnail(null)}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-bg-base/70 text-text-contrast backdrop-blur-md transition-colors hover:bg-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-[120px] w-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border-strong bg-bg-raised transition-colors hover:border-accent-pink hover:bg-accent-pink/5">
                    <ImageIcon size={20} className="text-text-secondary" />
                    <span className="text-[11px] font-medium text-text-secondary">Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
                <div className="flex flex-1 flex-col justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-4 text-[13px] text-[var(--text-secondary)]">
                  <div className="mb-1 flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                    <AlertTriangle size={14} className="text-[var(--amber)]" /> Text on imagery matters
                  </div>
                  <p>AI will scan your image for text. If your thumbnail text contradicts your caption hook, your score will drop.</p>
                </div>
              </div>
            </div>

            <button
              className="btn-accent w-full justify-center h-12 text-[15px] shadow-[0_4px_20px_rgba(225,48,108,0.2)]"
              onClick={handleScore}
              disabled={(!caption.trim() && !thumbnail) || analysing}
            >
              {analysing ? (
                <><Zap size={16} className="animate-pulse" /> Running Predictive Model...</>
              ) : (
                <><Sparkles size={16} /> Predict Performance</>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Results */}
        <div>
          {!analysing && !results && (
            <div className="surface-glass flex h-full flex-col items-center justify-center p-12 text-center opacity-80 min-h-[400px]">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--bg-raised)] border border-[var(--border-strong)]">
                <Target size={28} className="text-[var(--text-tertiary)]" />
              </div>
              <h3 className="mb-2 font-['Outfit'] text-[18px] font-bold text-text-contrast">No data yet</h3>
              <p className="text-[14px] text-[var(--text-secondary)]">Add your draft content on the left to see how it will perform.</p>
            </div>
          )}

          {analysing && (
            <div className="surface-glass flex h-full flex-col items-center justify-center p-12 text-center min-h-[400px]">
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-accent-pink/10"></div>
                <div className="absolute inset-0 animate-spin rounded-full border-t-2 border-accent-pink"></div>
                <Sparkles size={24} className="text-accent-pink animate-pulse" />
              </div>
              <div className="mb-3 font-['Outfit'] text-[18px] font-bold text-text-contrast">Analysing 140M Data Points</div>
              <div className="flex flex-col gap-2 text-[13px] text-[var(--text-secondary)]">
                <span className="flex items-center justify-center gap-2"><CheckCircle2 size={12} className="text-[var(--green)]" /> Parsing syntax</span>
                <span className="flex items-center justify-center gap-2"><CheckCircle2 size={12} className="text-green" /> Comparison complete</span>
                <span className="flex items-center justify-center gap-2 animate-pulse"><Target size={12} className="text-accent-pink" /> Predicting distribution</span>
              </div>
            </div>
          )}

          {results && (
            <div className="flex flex-col gap-6">
              {/* Score Rings Container */}
              <div className="grid grid-cols-2 gap-4">
                <ScoreRing score={results.hook.score} color={results.hook.color} label={results.hook.label} icon={LinkIcon} title="Hook Strength" />
                <ScoreRing score={results.dmShare.score} color={results.dmShare.color} label={results.dmShare.label} icon={MessageCircle} title="DM Share Rate" />
              </div>
              <div className="grid grid-cols-1">
                <ScoreRing score={results.niche.score} color={results.niche.color} label={results.niche.label} icon={Target} title="Niche Alignment" />
              </div>

              {/* Actionable Tips */}
              <div className="surface-glass p-0 overflow-hidden">
                <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-raised)] px-5 py-4">
                  <h3 className="font-['Outfit'] text-[15px] font-bold text-text-contrast flex items-center gap-2">
                    <Sparkles size={16} className="text-accent-pink" /> AI Suggestions
                  </h3>
                </div>
                
                {[
                  {
                    id: "tip-1",
                    color: "var(--red)",
                    title: "Rewrite the hook to be an outcome",
                    preview: "Your first line asks a question. Data shows statements perform better.",
                    full: "Question hooks ('Want to lose fat?') signal to the user they are being sold something. Switch to an outcome-led statement ('How I lost fat eating pizza twice a week'). This creates a curiosity gap rather than a 'yes/no' filter in the viewer's brain.",
                  },
                  {
                    id: "tip-2",
                    color: "var(--amber)",
                    title: "Strengthen Niche Keywords",
                    preview: "Add specific fitness terminology to help the algorithm categorize this.",
                    full: "Your caption uses simple words like 'food' and 'weight'. To ensure the algorithm serves this to the Fitness graph, include specific vocabulary like 'macros', 'maintenance calories', or 'protein intake'.",
                  },
                ].map((tip) => (
                  <div key={tip.id} className="border-b border-[var(--border-subtle)] last:border-none">
                    <button
                      className="flex w-full items-start justify-between p-5 text-left transition-colors hover:bg-[var(--bg-overlay)]"
                      onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                    >
                      <div>
                        <div className="mb-1 font-semibold text-[14px] text-text-contrast flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tip.color }}></span>
                          {tip.title}
                        </div>
                        <div className="text-[13px] text-[var(--text-secondary)] pr-4 leading-relaxed">{tip.preview}</div>
                        {expandedTip === tip.id && (
                          <div className="mt-3 rounded-lg bg-[var(--bg-raised)] border border-[var(--border-subtle)] p-4 text-[13px] text-[var(--text-primary)] leading-relaxed">
                            {tip.full}
                          </div>
                        )}
                      </div>
                      <div className="mt-1 text-[var(--text-tertiary)] shrink-0">
                        {expandedTip === tip.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {/* AI Replacement Suggestion */}
              <div className="surface-glass p-6 border-accent-pink/30 shadow-[0_8px_32px_rgba(225,48,108,0.15)]">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-['Outfit'] text-[15px] font-bold text-text-contrast flex items-center gap-2">
                    <Sparkles size={16} className="text-accent-pink" /> Generated Alternative
                  </h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(results.rewritten);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="flex items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--bg-raised)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-overlay)] hover:text-text-contrast"
                  >
                    {copied ? <CheckCircle2 size={12} className="text-[var(--green)]" /> : <Copy size={12} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="whitespace-pre-wrap rounded-lg bg-[var(--bg-raised)] p-4 text-[13px] font-medium leading-loose text-[var(--text-primary)] font-['Inter'] shadow-inner border border-[var(--border-subtle)]">
                  {results.rewritten}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
