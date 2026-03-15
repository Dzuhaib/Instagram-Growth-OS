"use client";
import { useState } from "react";
import {
  TrendingUp,
  MessageSquare,
  Share2,
  Target,
  ChevronRight,
  AlertTriangle,
  Heart,
  Calendar,
  Zap,
  Sparkles,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import AnimatedCounter from "@/components/AnimatedCounter";

const REACH_DATA = [
  { day: "Mon", reach: 12000 },
  { day: "Tue", reach: 18000 },
  { day: "Wed", reach: 15000 },
  { day: "Thu", reach: 24000 },
  { day: "Fri", reach: 38000 },
  { day: "Sat", reach: 42000 },
  { day: "Sun", reach: 35000 },
];

const SCHEDULE = [
  { day: "Mon", time: "6:00 PM", format: "Reel", score: 92 },
  { day: "Wed", time: "12:00 PM", format: "Carousel", score: 85 },
  { day: "Fri", time: "8:00 PM", format: "Reel", score: 98 },
];

const RECOMMENDATIONS = [
  {
    id: 1,
    type: "Hook Fix",
    impact: "High",
    title: "Switch to outcome-led hooks",
    desc: "Your last 3 Reels started with 'Here is how to...'. Our data shows hooks starting with 'I tried X for 30 days...' perform 4x better in your niche.",
    action: "View Hook Templates",
    color: "var(--accent-cyan)",
  },
  {
    id: 2,
    type: "Posting Time",
    impact: "High",
    title: "You're missing peak Saturday traffic",
    desc: "Saturday mornings account for 35% of your total weekly saves, but you haven't posted on a Saturday in 3 weeks.",
    action: "Update Schedule",
    color: "var(--green)",
  },
  {
    id: 3,
    type: "Niche Drift",
    impact: "Medium",
    title: "Recent posts are too broad",
    desc: "Your audience engages most with 'fitness routines', but your last 2 posts were 'lifestyle vlogs'. This confuses the algorithm.",
    action: "Check Niche Alignment",
    color: "var(--amber)",
  },
  {
    id: 4,
    type: "Content Gap",
    impact: "Medium",
    title: "Untapped Topic: Meal Prep",
    desc: "Competitors in your niche are seeing 2.3x higher reach on 'Meal Prep for Beginners' content. You have 0 posts on this topic.",
    action: "Explore Gap Analysis",
    color: "var(--accent-violet)",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="surface-glass rounded-lg border border-[var(--border-strong)] p-3 text-[13px] shadow-xl">
        <div className="mb-1 text-[var(--text-tertiary)]">{label}</div>
        <div className="font-bold text-[var(--accent-cyan)]">
          {(payload[0].value / 1000).toFixed(1)}K Reach
        </div>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [hoveredRec, setHoveredRec] = useState<number | null>(null);

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2">
            Welcome back, Jamie
          </h1>
          <p className="text-[15px] text-[var(--text-secondary)]">
            Your AI has processed 14 new data points since yesterday. You have{" "}
            <strong className="text-[var(--text-primary)]">4 new recommendations</strong>.
          </p>
        </div>
        <button className="btn-accent shrink-0 text-[13px] px-6">
          <Zap size={15} /> Score New Content
        </button>
      </div>

      {/* Metrics Row */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Est. Reach This Week", value: 184000, prefix: "", suffix: "", icon: TrendingUp, color: "var(--accent-cyan)" },
          { label: "Engagement Rate", value: 7.2, prefix: "", suffix: "%", icon: Heart, color: "var(--green)" },
          { label: "DM Share Score", value: 94, prefix: "", suffix: "/100", icon: Share2, color: "var(--accent-violet)" },
          { label: "Niche Consistency", value: 88, prefix: "", suffix: "%", icon: Target, color: "var(--amber)" },
        ].map((metric) => (
          <div key={metric.label} className="surface-glass p-6 transition-all hover:border-[var(--border-strong)]">
            <div className="mb-3 flex items-center justify-between">
              <div 
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-raised)]"
              >
                <metric.icon size={18} style={{ color: metric.color }} />
              </div>
            </div>
            <div className="mb-1 flex items-baseline gap-1 font-['Outfit'] text-3xl font-bold text-text-contrast tracking-tight">
              {metric.prefix}
              <AnimatedCounter value={metric.value} />
              {metric.suffix}
            </div>
            <div className="text-[13px] font-medium text-[var(--text-tertiary)]">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Trends & Schedule */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* Chart Card */}
          <div className="surface-glass p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-['Outfit'] text-lg font-bold text-text-contrast">Reach Velocity</h2>
                <span className="text-[13px] text-[var(--text-secondary)]">Last 7 days performance</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-raised)] px-3 py-1 text-xs font-semibold text-[var(--green)]">
                <TrendingUp size={12} /> +24% vs last week
              </div>
            </div>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REACH_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-strong)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area
                    type="monotone"
                    dataKey="reach"
                    stroke="var(--accent-cyan)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#reachGradient)"
                    activeDot={{ r: 6, fill: "var(--accent-cyan)", stroke: "var(--bg-base)", strokeWidth: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="surface-glass p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-['Outfit'] text-lg font-bold text-text-contrast">Optimal Schedule</h2>
              <button className="text-[13px] font-medium text-[var(--accent-cyan)] hover:underline">
                View Full Calendar
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {SCHEDULE.map((slot, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-4 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-overlay)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] font-['Outfit'] font-bold text-text-contrast shadow-inner">
                      <span className="text-[13px]">{slot.day}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[15px] text-text-contrast flex items-center gap-2">
                        <Calendar size={14} className="text-[var(--text-tertiary)]" />
                        {slot.time}
                      </div>
                      <div className="text-[13px] font-medium text-[var(--text-secondary)]">Format: <span className="text-text-contrast">{slot.format}</span></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">Score</span>
                      <span className="font-['Outfit'] text-[18px] font-bold text-[var(--green)]">
                        {slot.score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - AI Recommendations Feed */}
        <div className="surface-glass flex flex-col p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-['Outfit'] text-lg font-bold text-text-contrast flex items-center gap-2">
              <Sparkles size={16} className="text-[var(--accent-cyan)]" /> AI Feed
            </h2>
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[var(--accent-cyan-dim)] text-xs font-bold text-[var(--accent-cyan)] border border-[var(--border-accent)]">
              4
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {RECOMMENDATIONS.map((rec, i) => (
              <div
                key={rec.id}
                onMouseEnter={() => setHoveredRec(rec.id)}
                onMouseLeave={() => setHoveredRec(null)}
                className={`relative overflow-hidden rounded-xl border p-5 transition-all duration-300 ${
                  hoveredRec === rec.id
                    ? "border-[var(--border-strong)] bg-[var(--bg-overlay)] shadow-lg"
                    : "border-[var(--border-subtle)] bg-[var(--bg-raised)]"
                }`}
              >
                {/* Ranking Number */}
                <div 
                  className="absolute right-3 top-3 font-['Outfit'] text-4xl font-black italic opacity-[0.03] select-none"
                  style={{ color: rec.color }}
                >
                  #{i + 1}
                </div>

                <div className="mb-3 flex items-center gap-2">
                  <div
                    className="flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase"
                    style={{
                      color: rec.color,
                      borderColor: `color-mix(in srgb, ${rec.color} 20%, transparent)`,
                      backgroundColor: `color-mix(in srgb, ${rec.color} 10%, transparent)`,
                    }}
                  >
                    {rec.type}
                  </div>
                  {rec.impact === "High" && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--red)] uppercase tracking-wide">
                      <AlertTriangle size={12} /> High Impact
                    </div>
                  )}
                </div>

                <h3 className="mb-2 font-['Outfit'] text-[16px] font-bold leading-tight text-text-contrast">
                  {rec.title}
                </h3>
                
                <p className="mb-4 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                  {rec.desc}
                </p>

                <button
                  className="group flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
                  style={{ color: rec.color }}
                >
                  {rec.action}{" "}
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
