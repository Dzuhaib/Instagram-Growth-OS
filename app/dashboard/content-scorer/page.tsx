"use client";
import { useState, useEffect } from "react";
import { Target, MessageCircle, Link as LinkIcon, AlertTriangle, Image as ImageIcon, Zap, Sparkles, X, ChevronDown, ChevronUp, Copy, CheckCircle2 } from "lucide-react";

interface ScoreResult {
  hook: { score: number; label: string; color: string };
  dmShare: { score: number; label: string; color: string };
  niche: { score: number; label: string; color: string };
  rewritten: string;
}

export default function ContentScorerPage() {
  const [caption, setCaption] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [analysing, setAnalysing] = useState(false);
  const [results, setResults] = useState<ScoreResult | null>(null);
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [niche, setNiche] = useState("");

  useEffect(() => {
    setNiche(localStorage.getItem("growth_os_niche") || "General");
  }, []);

  const handleScore = async () => {
    if (!caption.trim() && !thumbnail) return;
    setAnalysing(true);
    setResults(null);
    try {
      const response = await fetch("/api/score-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption, hasThumbnail: !!thumbnail, niche }),
      });
      if (!response.ok) throw new Error("Failed to score content");
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      alert("Error predicting performance. Make sure your OpenAI API key is configured.");
    } finally {
      setAnalysing(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setThumbnail(e.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const ScoreRing = ({ score, color, icon: Icon, label, title }: { score: number, color: string, icon: React.ElementType, label: string, title: string }) => {
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="surface-glass p-6 text-center">
        <div className="relative mx-auto mb-4 h-[90px] w-[90px]">
          {/* Background Ring */}
          <svg className="h-full w-full rotate-[-90deg] transform">
            <circle cx="45" cy="45" r={radius} stroke="(--border-strong)" strokeWidth="6" fill="none" />
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
        <div className="mt-2 text-[12px] text-(--text-tertiary)">{title}</div>
      </div>
    );
  };

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2">Content Scorer</h1>
          <p className="text-[15px] text-(--text-secondary)">Predict reach and engagement before you hit post.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left Column: Input */}
        <div className="flex flex-col gap-6">
          <div className="surface-glass p-6 md:p-8">
            <h2 className="mb-6 font-['Outfit'] text-[18px] font-bold text-text-contrast flex items-center gap-2">
              <MessageCircle size={18} className="text-(--text-secondary)" /> Draft Your Post
            </h2>
            
            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-(--text-secondary)">Caption & Hook</label>
              <textarea
                className="input-field min-h-[160px] bg-bg-raised font-sans leading-relaxed shadow-inner focus:bg-bg-surface focus:ring-1 focus:ring-accent-pink focus:border-transparent transition-all"
                placeholder="Paste your caption here... The AI pays extra attention to the first 3 lines (the hook)."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label className="mb-3 block text-[13px] font-semibold text-(--text-secondary)">Thumbnail text (Optional)</label>
              <div className="flex flex-col sm:flex-row gap-4">
                {thumbnail ? (
                  <div className="relative h-[120px] w-24 shrink-0 overflow-hidden rounded-lg border border-border-strong">
                    <img src={thumbnail} alt="Upload preview" className="h-full w-full object-cover" />
                    <button
                      onClick={() => setThumbnail(null)}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-bg-base/70 text-text-contrast backdrop-blur-md transition-colors hover:bg-red"
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
                <div className="flex flex-1 flex-col justify-center rounded-lg border border-border-subtle bg-bg-raised p-4 text-[13px] text-(--text-secondary)">
                  <div className="mb-1 flex items-center gap-2 font-semibold text-text-primary">
                    <AlertTriangle size={14} className="text-amber" /> Text on imagery matters
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
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-bg-raised border border-border-strong">
                <Target size={28} className="text-(--text-tertiary)" />
              </div>
              <h3 className="mb-2 font-['Outfit'] text-[18px] font-bold text-text-contrast">No data yet</h3>
              <p className="text-[14px] text-(--text-secondary)">Add your draft content on the left to see how it will perform in the <strong className="text-text-contrast">{niche}</strong> graph.</p>
            </div>
          )}

          {analysing && (
            <div className="surface-glass flex h-full flex-col items-center justify-center p-12 text-center min-h-[400px]">
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-accent-pink/10"></div>
                <div className="absolute inset-0 animate-spin rounded-full border-t-2 border-accent-pink"></div>
                <Sparkles size={24} className="text-accent-pink animate-pulse" />
              </div>
              <div className="mb-3 font-['Outfit'] text-[18px] font-bold text-text-contrast">Analysing Niche Signals</div>
              <div className="flex flex-col gap-2 text-[13px] text-(--text-secondary)">
                <span className="flex items-center justify-center gap-2"><CheckCircle2 size={12} className="text-green" /> Parsing syntax</span>
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

              {/* AI Suggestion Area */}
              <div className="surface-glass p-6 border-accent-pink/30 shadow-[0_8px_32px_rgba(225,48,108,0.15)]">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-['Outfit'] text-[15px] font-bold text-text-contrast flex items-center gap-2">
                    <Sparkles size={16} className="text-accent-pink" /> AI Optimization
                  </h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(results.rewritten);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="flex items-center gap-1.5 rounded-md border border-border-strong bg-bg-raised px-2.5 py-1 text-[11px] font-semibold text-text-primary transition-colors hover:bg-bg-overlay hover:text-text-contrast"
                  >
                    {copied ? <CheckCircle2 size={12} className="text-green" /> : <Copy size={12} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="whitespace-pre-wrap rounded-lg bg-bg-raised p-4 text-[13px] font-medium leading-loose text-text-primary font-['Inter'] shadow-inner border border-border-subtle">
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
