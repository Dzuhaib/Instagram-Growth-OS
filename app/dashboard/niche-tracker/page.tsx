"use client";
import { useState, useEffect } from "react";
import {
  Target,
  TrendingUp,
  TrendingDown,
  Hash,
  ArrowRight,
  Flame,
  Activity,
  ChevronRight,
  Sparkles,
  BarChart3,
  Search,
  Zap,
} from "lucide-react";

interface TrendItem {
  rank: number;
  keyword: string;
  growth: string;
  volume: string;
  status: "rising" | "falling";
}

interface GapItem {
  topic: string;
  demand: number;
  supply: number;
  difficulty: string;
  insight: string;
}

interface NicheData {
  trends: TrendItem[];
  gaps: GapItem[];
  saturation: number;
  shifts: string[];
  hashtags?: string[];
}

export default function NicheTrackerPage() {
  const [activeTab, setActiveTab] = useState("trends");
  const [data, setData] = useState<NicheData | null>(null);
  const [loading, setLoading] = useState(true);
  const [niche, setNiche] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editNiche, setEditNiche] = useState("");

  const fetchNicheData = async () => {
    setLoading(true);
    const storedNiche = localStorage.getItem("growth_os_niche") || "General";
    setNiche(storedNiche);
    try {
      const response = await fetch("/api/niche-tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: storedNiche }),
      });
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNicheData();
  }, []);

  const handleSaveNiche = () => {
    if (!editNiche.trim()) return;
    localStorage.setItem("growth_os_niche", editNiche.trim());
    setNiche(editNiche.trim());
    setShowEditModal(false);
    fetchNicheData();
  };

  const currentNiche = niche || "General";

  return (
    <div className="pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-Heading text-3xl font-bold tracking-tight text-text-contrast mb-2 flex items-center gap-2">
            <Target className="text-accent-pink" size={28} /> Niche Tracker
          </h1>
          <p className="text-[15px] text-text-secondary">
            Monitor topic demand, keyword velocity, and algorithmic saturation in real-time.
          </p>
        </div>
        <div className="flex border border-border-strong bg-bg-raised rounded-lg p-1 shadow-inner h-[44px]">
          <button
            className={`flex items-center gap-2 px-5 py-2 rounded-md text-[13px] font-semibold transition-all ${
              activeTab === "trends"
                ? "bg-bg-surface text-text-contrast shadow-sm border border-border-subtle"
                : "text-text-tertiary hover:text-text-contrast"
            }`}
            onClick={() => setActiveTab("trends")}
          >
            <Activity size={14} /> Rising Trends
          </button>
          <button
            className={`flex items-center gap-2 px-5 py-2 rounded-md text-[13px] font-semibold transition-all ${
              activeTab === "gaps"
                ? "bg-bg-surface text-text-contrast shadow-sm border border-border-subtle"
                : "text-text-tertiary hover:text-text-contrast"
            }`}
            onClick={() => setActiveTab("gaps")}
          >
            <Search size={14} /> Content Gaps
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Main Content Area */}
        <div className="flex flex-col gap-8">
          
          {loading && (
            <div className="surface-glass flex min-h-[400px] flex-col items-center justify-center p-12 text-center">
              <Sparkles size={48} className="text-accent-pink animate-pulse mb-4" />
              <h2 className="text-lg font-bold text-text-contrast">Scanning algorithm signals...</h2>
              <p className="text-sm text-text-secondary">AI is aggregating real-time niche demand.</p>
            </div>
          )}

          {!loading && data && activeTab === "trends" && (
            <div className="surface-glass overflow-hidden border border-border-subtle shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-border-strong transition-all">
              <div className="border-b border-border-subtle bg-bg-raised px-6 py-5 flex items-center justify-between">
                <h2 className="font-Heading text-[18px] font-bold text-text-contrast flex items-center gap-2">
                  <Flame size={18} className="text-amber" /> Trending Keywords
                </h2>
                <div className="flex items-center gap-2">
                  <button onClick={fetchNicheData} className="p-2 hover:bg-bg-overlay rounded-lg transition-colors text-text-tertiary hover:text-text-contrast">
                     <Activity size={16} />
                  </button>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-text-tertiary px-3 py-1 rounded bg-bg-surface border border-border-subtle shadow-inner">
                    Last 7 Days
                  </span>
                </div>
              </div>
              <table className="w-full text-left text-[14px]">
                <thead className="bg-bg-surface text-[11px] font-semibold uppercase tracking-wider text-text-tertiary border-b border-border-subtle">
                  <tr>
                    <th className="px-6 py-4 w-12 text-center">#</th>
                    <th className="px-6 py-4">Keyword</th>
                    <th className="px-6 py-4 w-32">Velocity</th>
                    <th className="px-6 py-4 hidden sm:table-cell">Search Vol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle bg-bg-base">
                  {data?.trends?.map((trend) => (
                    <tr key={trend.keyword} className="transition-colors hover:bg-bg-overlay group">
                      <td className="px-6 py-4 text-center font-Heading text-[16px] font-bold text-text-tertiary italic">
                        {trend.rank}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 font-medium text-text-contrast transition-colors group-hover:text-accent-pink">
                          <Hash size={14} className="text-text-tertiary" /> {trend.keyword}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-1 font-bold ${
                          trend.status === "rising" ? "text-green" : "text-red"
                        }`}>
                          {trend.status === "rising" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          {trend.growth}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wider border shadow-inner ${
                          trend.volume === "High"
                            ? "border-amber/20 bg-amber/10 text-amber"
                            : trend.volume === "Medium"
                            ? "border-border-strong bg-bg-raised text-text-primary"
                            : "border-red/20 bg-red/10 text-red"
                        }`}>
                          {trend.volume}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && data && activeTab === "gaps" && (
            <div className="flex flex-col gap-6">
              {data?.gaps?.map((gap, i) => (
                <div key={i} className="surface-glass p-6 border border-border-subtle transition-all hover:border-border-strong hover:shadow-xl group">
                  <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4 border-b border-border-subtle pb-4">
                    <div>
                      <div className="mb-2 font-Heading text-[20px] font-bold tracking-tight text-text-contrast group-hover:text-accent-pink transition-colors">{gap.topic}</div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 rounded bg-bg-raised border border-border-subtle px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-green shadow-inner">
                          <Target size={12} /> High Demand
                        </span>
                        <span className="text-[12px] font-medium text-text-tertiary flex items-center gap-1">
                          Difficulty: <strong className="text-text-contrast">{gap.difficulty}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 grid grid-cols-2 gap-4">
                     <div className="rounded-lg bg-bg-raised border border-border-subtle p-4 shadow-inner">
                       <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-text-tertiary flex items-center gap-1.5"><TrendingUp size={12} /> Search Demand</div>
                       <div className="flex items-end gap-2">
                         <span className="font-Heading text-[28px] font-black text-text-contrast leading-none">{gap.demand}</span>
                         <span className="text-[14px] font-medium text-text-secondary mb-1">/100</span>
                       </div>
                       <div className="mt-2 h-1.5 w-full rounded-full bg-bg-surface overflow-hidden">
                          <div className="h-full bg-green transition-all" style={{ width: `${gap.demand}%` }}></div>
                       </div>
                     </div>
                     <div className="rounded-lg bg-bg-raised border border-border-subtle p-4 shadow-inner">
                       <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-text-tertiary flex items-center gap-1.5"><BarChart3 size={12} /> Content Supply</div>
                       <div className="flex items-end gap-2">
                         <span className="font-Heading text-[28px] font-black text-text-contrast leading-none">{gap.supply}</span>
                         <span className="text-[14px] font-medium text-text-secondary mb-1">/100</span>
                       </div>
                       <div className="mt-2 h-1.5 w-full rounded-full bg-bg-surface overflow-hidden">
                          <div className="h-full bg-red transition-all" style={{ width: `${gap.supply}%` }}></div>
                       </div>
                     </div>
                  </div>

                  <div className="rounded-lg border border-accent-pink/20 bg-gradient-to-r from-bg-raised to-bg-surface p-4 text-[13.5px] leading-relaxed text-text-primary font-medium font-sans shadow-inner">
                    <span className="font-bold text-text-contrast flex items-center gap-2 mb-1.5"><Sparkles size={14} className="text-accent-pink" /> AI Insight</span>
                    {gap.insight}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar - Niche Health Profile */}
        <div className="flex flex-col gap-6">
          <div className="surface-glass p-0 overflow-hidden border border-border-strong shadow-lg">
            <div className="border-b border-border-subtle bg-gradient-to-br from-bg-surface to-bg-raised p-6 text-center shadow-inner">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-bg-raised border border-border-strong shadow-inner">
                <Target size={28} className="text-accent-purple" />
              </div>
              <h3 className="font-Heading text-[18px] font-bold text-text-contrast mb-1 whitespace-nowrap overflow-hidden text-ellipsis px-2" title={currentNiche}>
                {currentNiche}
              </h3>
              <p className="text-[13px] text-text-secondary uppercase tracking-widest font-bold">Primary Niche</p>
            </div>
            
            <div className="p-6">
               <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between text-[13px] font-semibold text-text-contrast">
                     Overall Saturation
                     <span className="text-amber">{data?.saturation || 0}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-bg-raised overflow-hidden shadow-inner border border-border-subtle">
                     <div className="h-full bg-amber transition-all duration-1000" style={{ width: `${data?.saturation || 0}%` }}></div>
                  </div>
                  <p className="mt-3 text-[12px] text-text-secondary leading-relaxed">
                     {data && data.saturation > 70 
                       ? "The niche is highly saturated. Consider sub-niching for faster growth." 
                       : data ? "Moderate saturation detected. Focus on high-quality delivery." : "Fetching niche health data..."}
                  </p>
               </div>

               <div className="border-t border-border-subtle pt-6">
                  <h4 className="mb-4 text-[12px] font-bold uppercase tracking-widest text-text-tertiary flex items-center gap-2">
                     <Zap size={14} className="text-amber" /> Recommended Shifts
                  </h4>
                  <ul className="flex flex-col gap-3">
                     {(data?.shifts || []).map((shift, i) => (
                        <li key={i} className="flex items-start gap-2 text-[13px] font-medium text-text-primary">
                           <ChevronRight size={16} className="text-accent-pink shrink-0 mt-[1px]" />
                           {shift}
                        </li>
                     ))}
                     {(!data || (data?.shifts?.length || 0) === 0) && (
                       <li className="text-[12px] text-text-tertiary italic">Generating AI insights...</li>
                     )}
                  </ul>
               </div>

               {data?.hashtags && data.hashtags.length > 0 && (
                 <div className="border-t border-border-subtle pt-6 mt-6">
                    <h4 className="mb-4 text-[12px] font-bold uppercase tracking-widest text-text-tertiary flex items-center gap-2">
                       <Hash size={14} className="text-accent-pink" /> 95% Accurate Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                       {data.hashtags.map((tag, i) => (
                          <span key={i} className="inline-flex items-center rounded-md bg-accent-pink/10 px-2 py-1 text-[11px] font-bold text-accent-pink border border-accent-pink/20 shadow-inner hover:bg-accent-pink/20 transition-colors cursor-pointer">
                             {tag}
                          </span>
                       ))}
                    </div>
                 </div>
               )}

               <button 
                 className="btn-secondary w-full justify-center h-10 mt-8 shadow-sm border-border-strong bg-bg-raised hover:bg-bg-overlay hover:text-text-contrast"
                 onClick={() => {
                    setEditNiche(currentNiche);
                    setShowEditModal(true);
                 }}
               >
                 Edit Parameters
               </button>
            </div>
          </div>
        </div>

      </div>

      {/* Edit Niche Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="surface-glass w-full max-w-md p-6 border-border-strong shadow-2xl animate-in zoom-in-95 duration-200 rounded-2xl">
            <h2 className="mb-2 font-Heading text-[20px] font-bold text-text-contrast tracking-tight flex items-center gap-2">
              <Sparkles size={18} className="text-accent-pink" /> Edit Tracked Niche
            </h2>
            <p className="mb-6 text-[14px] leading-relaxed text-text-secondary">
              Update your primary niche to get AI insights tailored to a specific audience or topic.
            </p>
            <div className="mb-6">
              <label className="mb-2 block text-[13px] font-semibold text-text-secondary">Target Niche</label>
              <input 
                autoFocus
                className="input-field" 
                value={editNiche} 
                onChange={(e) => setEditNiche(e.target.value)}
                placeholder="e.g. Health & Fitness"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveNiche();
                }}
              />
            </div>
            <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
              <button
                className="btn-secondary h-10 w-full sm:w-auto"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-accent h-10 px-6 w-full sm:w-auto"
                onClick={handleSaveNiche}
              >
                Save & Analyze
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
