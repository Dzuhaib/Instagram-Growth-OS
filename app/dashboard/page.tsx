"use client";
import { useState, useEffect } from "react";
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

interface DashboardData {
  metrics: any[];
  reachData: any[];
  schedule: any[];
  recommendations: any[];
  newPoints: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="surface-glass rounded-lg border border-(--border-strong) p-3 text-[13px] shadow-xl">
        <div className="mb-1 text-(--text-tertiary)">{label}</div>
        <div className="font-bold text-accent-pink">
          {(payload[0].value / 1000).toFixed(1)}K Reach
        </div>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredRec, setHoveredRec] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");

  const fetchDashboardData = async () => {
    setLoading(true);
    const storedName = localStorage.getItem("growth_os_name") || "Creator";
    const storedHandle = localStorage.getItem("growth_os_handle") || "@handle";
    const niche = localStorage.getItem("growth_os_niche") || "General";
    const goal = localStorage.getItem("growth_os_goal") || "Growth";
    
    setName(storedName);
    setHandle(storedHandle);

    try {
      const response = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, goal }),
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
    fetchDashboardData();
  }, []);

  const getMetricIcon = (iconName: string) => {
    switch (iconName) {
      case "TrendingUp": return TrendingUp;
      case "Heart": return Heart;
      case "Share2": return Share2;
      case "Target": return Target;
      default: return TrendingUp;
    }
  };

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2">
            Welcome back, {name || "Creator"}
          </h1>
          <div className="flex items-center gap-2 mb-3">
             <span className="text-[13px] font-bold text-accent-pink bg-accent-pink/10 px-2 py-0.5 rounded border border-accent-pink/20">
               {handle || "@connected"}
             </span>
             <span className="text-[12px] text-(--text-tertiary) flex items-center gap-1">
               <Zap size={10} className="text-amber" /> AI Analyzed
             </span>
          </div>
          <p className="text-[15px] text-(--text-secondary)">
            Your AI has processed {data?.newPoints || 0} new data points since yesterday. You have{" "}
            <strong className="text-(--text-primary)">{(data?.recommendations || []).length} new recommendations</strong>.
          </p>
        </div>
        <button className="btn-accent shrink-0 text-[13px] px-6 h-11">
          <Sparkles size={15} /> Score New Content
        </button>
      </div>

      {/* Metrics Row */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading && [1, 2, 3, 4].map((i) => (
          <div key={i} className="surface-glass p-6 h-[100px] animate-pulse bg-bg-raised" />
        ))}
        {!loading && data?.metrics?.map((metric: any) => {
          const Icon = getMetricIcon(metric.icon);
          return (
            <div key={metric.label} className="surface-glass p-6 transition-all hover:border-(--border-strong)">
              <div className="mb-3 flex items-center justify-between">
                <div 
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--border-subtle) bg-(--bg-raised)"
                >
                  <Icon size={18} style={{ color: metric.color }} />
                </div>
              </div>
              <div className="mb-1 flex items-baseline gap-1 font-['Outfit'] text-3xl font-bold text-text-contrast tracking-tight">
                <AnimatedCounter value={metric.value} />
                {metric.suffix}
              </div>
              <div className="text-[13px] font-medium text-(--text-tertiary)">{metric.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Trends & Schedule */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* Chart Card */}
          <div className="surface-glass p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-['Outfit'] text-lg font-bold text-text-contrast">Reach Velocity</h2>
                <span className="text-[13px] text-(--text-secondary)">Last 7 days performance</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-bg-raised px-3 py-1 text-xs font-semibold text-green">
                <TrendingUp size={12} /> +24% vs last week
              </div>
            </div>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.reachData || []} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-pink)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent-pink)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-strong)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area
                    type="monotone"
                    dataKey="reach"
                    stroke="var(--accent-pink)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#reachGradient)"
                    activeDot={{ r: 6, fill: "var(--accent-pink)", stroke: "var(--bg-base)", strokeWidth: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="surface-glass p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-['Outfit'] text-lg font-bold text-text-contrast">Optimal Schedule</h2>
              <button className="text-[13px] font-medium text-accent-pink hover:underline">
                View Full Calendar
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {loading && [1, 2, 3].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-xl bg-(--bg-raised)" />
              ))}
              {!loading && data?.schedule?.map((slot: any, i: number) => (
                <div
                  key={i}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-(--border-subtle) bg-(--bg-raised) p-4 transition-colors hover:border-(--border-strong) hover:bg-(--bg-overlay)"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg border border-(--border-subtle) bg-(--bg-surface) font-['Outfit'] font-bold text-text-contrast shadow-inner">
                      <span className="text-[13px]">{slot.day}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[15px] text-text-contrast flex items-center gap-2">
                        <Calendar size={14} className="text-(--text-tertiary)" />
                        {slot.time}
                      </div>
                      <div className="text-[13px] font-medium text-(--text-secondary)">Format: <span className="text-text-contrast">{slot.format}</span></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-(--text-tertiary)">Score</span>
                      <span className="font-['Outfit'] text-[18px] font-bold text-green">
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
              <Sparkles size={16} className="text-accent-pink" /> AI Feed
            </h2>
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-accent-pink/10 text-xs font-bold text-accent-pink border border-accent-pink/30">
              4
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {loading && [1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-(--bg-raised)" />
            ))}
            {!loading && data?.recommendations?.map((rec: any, i: number) => (
              <div
                key={rec.id}
                onMouseEnter={() => setHoveredRec(rec.id)}
                onMouseLeave={() => setHoveredRec(null)}
                className={`relative overflow-hidden rounded-xl border p-5 transition-all duration-300 ${
                  hoveredRec === rec.id
                    ? "border-(--border-strong) bg-(--bg-overlay) shadow-lg"
                    : "border-(--border-subtle) bg-(--bg-raised)"
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
                    <div className="flex items-center gap-1 text-[11px] font-bold text-red uppercase tracking-wide">
                      <AlertTriangle size={12} /> High Impact
                    </div>
                  )}
                </div>

                <h3 className="mb-2 font-['Outfit'] text-[16px] font-bold leading-tight text-text-contrast">
                  {rec.title}
                </h3>
                
                <p className="mb-4 text-[13px] leading-relaxed text-(--text-secondary)">
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
