"use client";
import { useState, useEffect } from "react";
import {
  TrendingUp,
  Search,
  Eye,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Zap,
  Target,
  Sparkles,
  BarChart3,
  X,
} from "lucide-react";

export default function CompetitorGapPage() {
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [newCompetitor, setNewCompetitor] = useState("");
  const [analysing, setAnalysing] = useState(false);
  const [results, setResults] = useState<{
    id: number;
    topic: string;
    opportunity: string;
    competitorReach: string;
    yourReach: string;
    why: string;
    recommendations: string[];
  }[] | null>(null);
  const [niche, setNiche] = useState("");

  useEffect(() => {
    const storedNiche = localStorage.getItem("growth_os_niche") || "General";
    setNiche(storedNiche);
    
    // Default competitors based on niche if none added yet? 
    // Actually better to start empty or with a message.
  }, []);

  const addCompetitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCompetitor && competitors.length < 3 && !competitors.includes(newCompetitor)) {
      let handle = newCompetitor.startsWith("@") ? newCompetitor : `@${newCompetitor}`;
      setCompetitors([...competitors, handle]);
      setNewCompetitor("");
    }
  };

  const removeCompetitor = (handle: string) => {
    setCompetitors(competitors.filter((c) => c !== handle));
  };

  const runAnalysis = async () => {
    if (competitors.length === 0) return;
    setAnalysing(true);
    setResults(null);
    try {
      const response = await fetch("/api/competitor-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ competitors, niche }),
      });
      if (!response.ok) throw new Error("Failed to analyze competitors");
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      alert("Error generating competitor gaps. Make sure your OpenAI API key is configured.");
    } finally {
      setAnalysing(false);
    }
  };

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-Heading text-3xl font-bold tracking-tight text-text-contrast mb-2 flex items-center gap-2">
            <Target className="text-accent-pink" size={28} /> Competitor Gap
          </h1>
          <p className="text-[15px] text-text-secondary">
            Discover what's working for your competitors in the <strong className="text-text-contrast">{niche}</strong> niche.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        {/* Left Column: Config */}
        <div className="flex flex-col gap-6">
          <div className="surface-glass p-6 md:p-8">
            <h2 className="mb-6 font-Heading text-[18px] font-bold text-text-contrast flex items-center gap-2">
              <Search size={18} className="text-accent-pink" /> Track Competitors
            </h2>

            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-text-secondary">
                Target Accounts (Max 3)
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {competitors.map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2 rounded-full border border-border-strong bg-bg-raised px-3 py-1.5 text-[13px] font-semibold text-text-contrast shadow-inner transition-colors hover:border-accent-pink"
                  >
                    <span className="text-accent-pink">@</span>{c.replace("@", "")}
                    <button
                      onClick={() => removeCompetitor(c)}
                      className="ml-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-bg-overlay text-[10px] text-text-secondary hover:bg-red/10 hover:text-red transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
                {competitors.length === 0 && (
                  <div className="text-[12px] text-text-tertiary italic p-2">No competitors added.</div>
                )}
              </div>

              {competitors.length < 3 && (
                <form onSubmit={addCompetitor} className="flex gap-2">
                  <input
                    className="input-field bg-bg-raised border border-border-subtle focus:border-accent-pink focus:ring-1 focus:ring-accent-pink"
                    placeholder="E.g. @username"
                    value={newCompetitor}
                    onChange={(e) => setNewCompetitor(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn-secondary px-5 shrink-0 hover:bg-accent-pink/5 hover:text-accent-pink hover:border-accent-pink/30"
                    disabled={!newCompetitor}
                  >
                    Add
                  </button>
                </form>
              )}
            </div>

            <div className="mb-8 rounded-lg border border-border-subtle bg-bg-raised p-5 text-[13px] text-text-secondary leading-relaxed shadow-inner">
              <div className="mb-2 flex items-center gap-2 font-Heading font-bold text-text-contrast text-[15px]">
                <Zap size={16} className="text-amber" /> Algorithm Insight
              </div>
              AI scans competitor data to find "Gaps" — topics with proven reach that you are missing out on.
            </div>

            <button
              className="btn-accent w-full justify-center h-12 text-[15px] shadow-[0_4px_20px_rgba(225,48,108,0.2)]"
              onClick={runAnalysis}
              disabled={competitors.length === 0 || analysing}
            >
              {analysing ? (
                <><Sparkles size={16} className="animate-pulse" /> Scanning graphs...</>
              ) : (
                <><BarChart3 size={16} /> Run Gap Analysis</>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Results */}
        <div>
          {!analysing && !results && (
            <div className="surface-glass flex h-full min-h-[500px] flex-col items-center justify-center p-12 text-center opacity-80 border-border-subtle">
              <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-bg-raised border border-border-strong shadow-inner">
                <Target size={32} className="text-text-tertiary" />
              </div>
              <h3 className="mb-2 font-Heading text-[20px] font-bold text-text-contrast">Awaiting Competitors</h3>
              <p className="text-[14px] text-text-secondary max-w-sm">
                Add target accounts on the left to uncover untapped content opportunities for <strong className="text-text-contrast">{niche}</strong>.
              </p>
            </div>
          )}

          {analysing && (
            <div className="surface-glass flex h-full min-h-[500px] flex-col items-center justify-center p-12 text-center border-border-subtle">
              <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-accent-pink/10"></div>
                <div className="absolute inset-0 rounded-full border-t border-accent-pink animate-spin" style={{ animationDuration: "1.5s" }}></div>
                <div className="absolute inset-2 rounded-full border-b border-accent-purple animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }}></div>
                <Sparkles size={28} className="text-accent-pink animate-pulse" />
              </div>
              
              <div className="mb-2 font-Heading text-[20px] font-bold text-text-contrast">Cross-referencing Graphs</div>
              <div className="text-[14px] text-text-secondary">
                Comparing competitor patterns against your library...
              </div>
            </div>
          )}

          {results && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {results?.map((gap: any, index: number) => (
                <div key={gap.id} className="surface-glass overflow-hidden border border-border-subtle transition-all hover:border-border-strong hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border-subtle bg-bg-raised p-5 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-bg-surface border border-border-subtle shadow-inner font-Heading text-[18px] font-black text-text-contrast italic">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="mb-0.5 font-Heading text-[17px] font-bold text-text-contrast tracking-tight">{gap.topic}</div>
                        <div className="flex items-center gap-2 text-[12px] font-semibold text-text-tertiary uppercase tracking-wider">
                          <Eye size={12} /> Algo Pattern Found
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className="flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide uppercase shadow-sm"
                      style={{
                        color: gap.opportunity === "High" ? "var(--green)" : "var(--amber)",
                        borderColor: gap.opportunity === "High" ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)",
                        backgroundColor: gap.opportunity === "High" ? "var(--green-dim)" : "var(--amber-dim)",
                      }}
                    >
                      <Zap size={12} /> {gap.opportunity} Opportunity
                    </div>
                  </div>

                  {/* Reach Comparison */}
                  <div className="grid grid-cols-2 divide-x divide-border-subtle border-b border-border-subtle bg-bg-surface">
                    <div className="p-5 text-center transition-colors hover:bg-bg-overlay">
                      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Competitor Avg</div>
                      <div className="font-Heading text-[22px] font-bold text-accent-purple">{gap.competitorReach}</div>
                    </div>
                    <div className="p-5 text-center transition-colors hover:bg-bg-overlay">
                      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Your Avg</div>
                      <div className="font-Heading text-[22px] font-bold text-red">{gap.yourReach}</div>
                    </div>
                  </div>

                  {/* Actionable Insights */}
                  <div className="p-6">
                    <div className="mb-5 rounded-lg border border-accent-pink/20 bg-gradient-to-r from-bg-raised to-bg-surface p-4 shadow-inner">
                      <div className="mb-2 flex items-center gap-2 font-Heading text-[14px] font-bold text-text-contrast">
                        <TrendingUp size={16} className="text-accent-pink" /> Strategic Gap
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-text-primary font-medium font-sans">
                        {gap.why}
                      </p>
                    </div>

                    <div>
                      <div className="mb-4 text-[12px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                        <Lightbulb size={14} /> Playbook to execute
                      </div>
                      <div className="flex flex-col gap-3 pl-2 border-l border-border-strong ml-[7px]">
                        {gap?.recommendations?.map((rec: string, i: number) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bg-raised border border-border-subtle text-[10px] font-bold text-accent-pink">
                              {i + 1}
                            </span>
                            <span className="text-[13.5px] leading-relaxed text-text-secondary pt-[1px]">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg border border-border-strong bg-bg-raised h-[44px] text-[13px] font-semibold text-text-contrast transition-all hover:bg-bg-overlay hover:border-accent-pink/30 hover:text-accent-pink">
                      Score this content concept <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
