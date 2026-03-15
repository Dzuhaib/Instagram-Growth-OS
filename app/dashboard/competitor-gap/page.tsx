"use client";
import { useState } from "react";
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
  ChevronDown,
} from "lucide-react";

export default function CompetitorGapPage() {
  const [competitors, setCompetitors] = useState(["@gymshark", "@chrisbumstead"]);
  const [newCompetitor, setNewCompetitor] = useState("");
  const [analysing, setAnalysing] = useState(false);
  const [results, setResults] = useState<any>(null);

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

  const runAnalysis = () => {
    if (competitors.length === 0) return;
    setAnalysing(true);
    setResults(null);
    setTimeout(() => {
      setAnalysing(false);
      setResults([
        {
          id: 1,
          topic: "Full Day of Eating (Bulking)",
          opportunity: "High",
          competitorReach: "450K avg / post",
          yourReach: "N/A (0 posts)",
          why: "Audiences in your niche are highly driven by transformational tracking. @chrisbumstead saw a 34% spike in profile visits when posting this topic.",
          recommendations: [
            "Post a 60s Reel showing exactly what you eat on a high-carb day",
            "Use the hook: 'How I eat 4,000 calories without feeling sluggish'",
            "Include exact protein macros in the caption text (AI flags this as a highly searched term)",
          ],
        },
        {
          id: 2,
          topic: "Form Correction (Deadlifts)",
          opportunity: "Medium",
          competitorReach: "220K avg / post",
          yourReach: "45K avg (2 posts, 6mo ago)",
          why: "Educational 'Do this, Not that' content drives the highest save rate in the fitness niche right now.",
          recommendations: [
            "Create a split-screen video comparing common mistakes",
            "Use text overlays pointing exactly to the lower back",
            "Call to action: 'Save this for your next pull day'",
          ],
        },
        {
          id: 3,
          topic: "Mobility Routines",
          opportunity: "High",
          competitorReach: "380K avg / post",
          yourReach: "12K avg (1 post)",
          why: "Longevity and joint health are currently out-pacing pure hypertrophy content in algorithm preference.",
          recommendations: [
            "Post a 3-move morning mobility sequence",
            "Caption focus: 'Doing this every morning fixed my knee pain'",
            "Use a trending low-fi audio track to boost algorithmic push",
          ],
        },
      ]);
    }, 3200);
  };

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2 flex items-center gap-2">
            <Target className="text-[var(--accent-cyan)]" size={28} /> Competitor Gap
          </h1>
          <p className="text-[15px] text-[var(--text-secondary)]">
            Discover what's working for your competitors that you aren't doing yet.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        {/* Left Column: Config */}
        <div className="flex flex-col gap-6">
          <div className="surface-glass p-6 md:p-8">
            <h2 className="mb-6 font-['Outfit'] text-[18px] font-bold text-text-contrast flex items-center gap-2">
              <Search size={18} className="text-[var(--accent-cyan)]" /> Track Competitors
            </h2>

            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[var(--text-secondary)]">
                Target Accounts (Max 3)
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {competitors.map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-raised)] px-3 py-1.5 text-[13px] font-semibold text-text-contrast shadow-inner transition-colors hover:border-[var(--accent-cyan)]"
                  >
                    <span className="text-[var(--accent-cyan)]">@</span>{c.replace("@", "")}
                    <button
                      onClick={() => removeCompetitor(c)}
                      className="ml-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--bg-overlay)] text-[10px] text-[var(--text-secondary)] hover:bg-[var(--red-dim)] hover:text-[var(--red)] transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {competitors.length < 3 && (
                <form onSubmit={addCompetitor} className="flex gap-2">
                  <input
                    className="input-field bg-[var(--bg-raised)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)]"
                    placeholder="E.g. @gymshark"
                    value={newCompetitor}
                    onChange={(e) => setNewCompetitor(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn-secondary px-5 shrink-0 hover:bg-[var(--accent-cyan-dim)] hover:text-[var(--accent-cyan)] hover:border-[var(--border-accent)]"
                    disabled={!newCompetitor}
                  >
                    Add
                  </button>
                </form>
              )}
            </div>

            <div className="mb-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-5 text-[13px] text-[var(--text-secondary)] leading-relaxed">
              <div className="mb-2 flex items-center gap-2 font-['Outfit'] font-bold text-text-contrast text-[15px]">
                <Zap size={16} className="text-[var(--amber)]" /> How this works
              </div>
              AI scans the last 100 posts of your competitors. It cross-references their highest-performing topics against your own content library to find "Gaps" — topics with proven reach that you are missing out on.
            </div>

            <button
              className="btn-accent w-full justify-center h-12 text-[15px] shadow-[0_0_20px_var(--accent-cyan-dim)]"
              onClick={runAnalysis}
              disabled={competitors.length === 0 || analysing}
            >
              {analysing ? (
                <><Sparkles size={16} className="animate-pulse" /> Scanning competitor data...</>
              ) : (
                <><BarChart3 size={16} /> Run Gap Analysis</>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Results */}
        <div>
          {!analysing && !results && (
            <div className="surface-glass flex h-full min-h-[500px] flex-col items-center justify-center p-12 text-center opacity-80">
              <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-[var(--bg-raised)] border border-[var(--border-strong)] shadow-inner">
                <Target size={32} className="text-[var(--text-tertiary)]" />
              </div>
              <h3 className="mb-2 font-['Outfit'] text-[20px] font-bold text-text-contrast">Ready to uncover gaps</h3>
              <p className="text-[14px] text-[var(--text-secondary)] max-w-sm">
                Add up to 3 competitors and run an analysis to find untapped content opportunities.
              </p>
            </div>
          )}

          {analysing && (
            <div className="surface-glass flex h-full min-h-[500px] flex-col items-center justify-center p-12 text-center">
              <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[var(--accent-cyan-dim)]"></div>
                <div className="absolute inset-0 rounded-full border-t border-[var(--accent-cyan)] animate-spin" style={{ animationDuration: "1.5s" }}></div>
                <div className="absolute inset-2 rounded-full border-b border-[var(--accent-violet)] animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }}></div>
                <Sparkles size={28} className="text-[var(--accent-cyan)] animate-pulse" />
              </div>
              
              <div className="mb-2 font-['Outfit'] text-[20px] font-bold text-text-contrast">Cross-referencing graphs</div>
              <div className="text-[14px] text-[var(--text-secondary)]">
                Comparing {competitors.length * 100} competitor posts against your library...
              </div>
            </div>
          )}

          {results && (
            <div className="flex flex-col gap-6">
              {results.map((gap: any, index: number) => (
                <div key={gap.id} className="surface-glass overflow-hidden border border-[var(--border-subtle)] transition-all hover:border-[var(--border-strong)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-raised)] p-5 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-inner font-['Outfit'] text-[18px] font-black text-text-contrast italic opacity-80">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="mb-0.5 font-['Outfit'] text-[17px] font-bold text-text-contrast tracking-tight">{gap.topic}</div>
                        <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
                          <Eye size={12} /> Untapped Matrix
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className="flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide uppercase"
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
                  <div className="grid grid-cols-2 divide-x divide-[var(--border-subtle)] border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                    <div className="p-5 text-center transition-colors hover:bg-[var(--bg-overlay)]">
                      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Competitor Avg</div>
                      <div className="font-['Outfit'] text-[22px] font-bold text-[var(--accent-violet)]">{gap.competitorReach}</div>
                    </div>
                    <div className="p-5 text-center transition-colors hover:bg-[var(--bg-overlay)]">
                      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Your Avg</div>
                      <div className="font-['Outfit'] text-[22px] font-bold text-[var(--red)]">{gap.yourReach}</div>
                    </div>
                  </div>

                  {/* Actionable Insights */}
                  <div className="p-6">
                    <div className="mb-5 rounded-lg border border border-[rgba(0,229,255,0.15)] bg-gradient-to-r from-[var(--bg-raised)] to-[var(--bg-surface)] p-4 shadow-inner">
                      <div className="mb-2 flex items-center gap-2 font-['Outfit'] text-[14px] font-bold text-text-contrast">
                        <TrendingUp size={16} className="text-[var(--accent-cyan)]" /> Why this matters
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-[var(--text-primary)] font-medium font-['Inter']">
                        {gap.why}
                      </p>
                    </div>

                    <div>
                      <div className="mb-4 text-[12px] font-bold uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
                        <Lightbulb size={14} /> Playbook to execute
                      </div>
                      <div className="flex flex-col gap-3 pl-2 border-l border-[var(--border-strong)] ml-[7px]">
                        {gap.recommendations.map((rec: string, i: number) => (
                          <div key={i} className="flex items-start gap-3 relative before:absolute before:content-[''] before:w-2 before:h-[1px] before:bg-[var(--border-strong)] before:-left-2 before:top-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--bg-raised)] border border-[var(--border-subtle)] text-[10px] font-bold text-[var(--accent-cyan)] z-10">
                              {i + 1}
                            </span>
                            <span className="text-[13.5px] leading-relaxed text-[var(--text-secondary)] pt-[1px]">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-raised)] h-[44px] text-[13px] font-semibold text-text-contrast transition-all hover:bg-[var(--bg-overlay)] hover:border-[var(--border-accent)] hover:text-[var(--accent-cyan)]">
                      Draft a post about this <ArrowRight size={14} />
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

// Ensure the local missing icon `LineChart` is either imported or swapped. Note that earlier I used `LineChart` but it's not imported from lucide. Let me swap it for `TrendingUp` which is imported.
