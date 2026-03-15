"use client";
import { useState } from "react";
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
} from "lucide-react";

const TRENDS = [
  { rank: 1, keyword: "hyrox training", growth: "+145%", volume: "High", status: "rising" },
  { rank: 2, keyword: "gut health protocol", growth: "+82%", volume: "High", status: "rising" },
  { rank: 3, keyword: "zone 2 cardio", growth: "+64%", volume: "Medium", status: "rising" },
  { rank: 4, keyword: "75 hard results", growth: "-24%", volume: "Medium", status: "falling" },
  { rank: 5, keyword: "keto meal prep", growth: "-41%", volume: "Low", status: "falling" },
];

const CONTENT_GAPS = [
  {
    topic: "Meal Prep for Shift Workers",
    demand: 88,
    supply: 24,
    difficulty: "Low",
    insight: "High search volume between 10PM-2AM. Very few creators making niche content for night shifts.",
  },
  {
    topic: "Mobility vs Flexibility differences",
    demand: 76,
    supply: 41,
    difficulty: "Medium",
    insight: "Educational gap. Users are confused by terminology and seeking simple visual comparisons.",
  },
];

export default function NicheTrackerPage() {
  const [activeTab, setActiveTab] = useState("trends");

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
          
          {activeTab === "trends" && (
            <div className="surface-glass overflow-hidden border border-border-subtle shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-border-strong transition-all">
              <div className="border-b border-border-subtle bg-bg-raised px-6 py-5 flex items-center justify-between">
                <h2 className="font-Heading text-[18px] font-bold text-text-contrast flex items-center gap-2">
                  <Flame size={18} className="text-amber" /> Trending Keywords
                </h2>
                <span className="text-[12px] font-bold uppercase tracking-wider text-text-tertiary px-3 py-1 rounded bg-bg-surface border border-border-subtle shadow-inner">
                  Last 7 Days
                </span>
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
                  {TRENDS.map((trend) => (
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

          {activeTab === "gaps" && (
            <div className="flex flex-col gap-6">
              {CONTENT_GAPS.map((gap, i) => (
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
          <div className="surface-glass p-0 overflow-hidden border-border-strong shadow-lg">
            <div className="border-b border-border-subtle bg-gradient-to-br from-bg-surface to-bg-raised p-6 text-center shadow-inner">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-bg-raised border border-border-strong shadow-inner text-[10px] font-bold text-text-contrast">
                <Target size={28} className="text-accent-purple" />
              </div>
              <h3 className="font-Heading text-[18px] font-bold text-text-contrast mb-1">Fitness & Hybrid</h3>
              <p className="text-[13px] text-text-secondary">Your Primary Niche</p>
            </div>
            
            <div className="p-6">
               <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between text-[13px] font-semibold text-text-contrast">
                     Overall Saturation
                     <span className="text-amber">72%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-bg-raised overflow-hidden shadow-inner border border-border-subtle">
                     <div className="h-full bg-amber transition-all" style={{ width: '72%' }}></div>
                  </div>
                  <p className="mt-2 text-[12px] text-text-secondary leading-relaxed">
                     The broad fitness niche is highly saturated. Growth requires pivoting into sub-niches (e.g. Hyrox) or targeting specific demographics.
                  </p>
               </div>

               <div className="border-t border-border-subtle pt-6">
                  <h4 className="mb-4 text-[12px] font-bold uppercase tracking-widest text-text-tertiary flex items-center gap-2">
                     <TrendingUp size={14} /> Recommended Shifts
                  </h4>
                  <ul className="flex flex-col gap-3">
                     {["Hybrid Athlete Training", "Zone 2 specific cardio", "Longevity protocols"].map((shift, i) => (
                        <li key={i} className="flex items-start gap-2 text-[13px] font-medium text-text-primary">
                           <ChevronRight size={16} className="text-accent-pink shrink-0 mt-[1px]" />
                           {shift}
                        </li>
                     ))}
                  </ul>
               </div>

               <button className="btn-secondary w-full justify-center h-10 mt-6 shadow-sm border-border-strong bg-bg-raised hover:bg-bg-overlay hover:text-text-contrast">
                 Edit Niche Parameters
               </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
