"use client";
import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Calendar,
  Sparkles,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PIE_COLORS = ["var(--accent-pink)", "var(--accent-purple)", "var(--text-tertiary)"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="surface-glass rounded-lg border border-(--border-strong) p-4 text-[13px] shadow-xl">
        <div className="mb-2 font-semibold text-text-contrast">{label}</div>
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1">
            <span className="flex items-center gap-1.5 text-(--text-secondary)">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
              {entry.name}
            </span>
            <span className="font-bold text-text-contrast">
              {entry.name === "Rate" ? `${entry.value}%` : entry?.value?.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface AnalyticsData {
  summary: any[];
  reachData: any[];
  formatData: any[];
  engagementData: any[];
  followerData: any[];
  posts: any[];
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({ key: "date", direction: "desc" });

  const fetchAnalytics = async () => {
    setLoading(true);
    const niche = localStorage.getItem("growth_os_niche") || "General";
    try {
      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timeRange, niche }),
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
    fetchAnalytics();
  }, [timeRange]);

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case "Eye": return Eye;
      case "TrendingUp": return TrendingUp;
      case "Users": return Users;
      case "Sparkles": return Sparkles;
      default: return Sparkles;
    }
  };

  const sortedPosts = [...(data?.posts || [])].sort((a: any, b: any) => {
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    
    // Quick parse for numbers in strings
    if (typeof aVal === 'string' && aVal.includes('K')) aVal = parseFloat(aVal) * 1000;
    if (typeof bVal === 'string' && bVal.includes('K')) bVal = parseFloat(bVal) * 1000;
    if (typeof aVal === 'string' && aVal.includes('%')) aVal = parseFloat(aVal);
    if (typeof bVal === 'string' && bVal.includes('%')) bVal = parseFloat(bVal);

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") { direction = "asc"; }
    setSortConfig({ key, direction });
  };

  return (
    <div className="pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2 flex items-center gap-2">
            <BarChart3 className="text-accent-pink" size={28} /> Performance Analytics
          </h1>
          <p className="text-[15px] text-(--text-secondary)">
            Deep dive into your account growth, reach formats, and AI attribution.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex rounded-lg border border-(--border-strong) bg-(--bg-raised) p-1">
            {["7d", "30d", "90d", "YTD"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-md px-4 py-1.5 text-[13px] font-semibold transition-all ${
                  timeRange === range
                    ? "bg-bg-surface text-text-contrast shadow-sm border border-(--border-subtle)"
                    : "text-(--text-tertiary) hover:text-text-contrast"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="btn-secondary h-[38px] px-4 text-[13px]">
            <Download size={14} className="mr-1" /> Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading && [1, 2, 3, 4].map((i) => (
          <div key={i} className="surface-glass p-6 h-[100px] animate-pulse bg-bg-raised" />
        ))}
        {!loading && data?.summary?.map((stat) => {
          const Icon = getStatIcon(stat.icon);
          return (
            <div key={stat.label} className="surface-glass p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[13px] font-medium text-(--text-secondary)">{stat.label}</span>
                <Icon size={16} style={{ color: stat.color }} />
              </div>
              <div className="mb-2 font-['Outfit'] text-[32px] font-bold text-text-contrast tracking-tight leading-none">
                {stat.value}
              </div>
              <div className={`flex items-center gap-1 text-[12px] font-semibold ${stat.isUp ? "text-green" : "text-red"}`}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {stat.trend} vs last period
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Grid */}
      <div className="mb-8 grid gap-8 lg:grid-cols-3">
        {/* Reach Breakdown (Spans 2 cols) */}
        <div className="surface-glass p-6 lg:p-8 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-['Outfit'] text-[18px] font-bold text-text-contrast">Reach Distribution</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.reachData || []} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNonFollower" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-pink)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--accent-pink)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorFollower" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-purple)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--accent-purple)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-strong)" opacity={0.5} />
                <XAxis dataKey="date" stroke="var(--text-tertiary)" fontSize={11} tickMargin={10} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-tertiary)" fontSize={11} tickFormatter={(val) => `${val / 1000}k`} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-strong)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)' }} />
                <Area type="monotone" dataKey="nonFollowers" name="Non-Followers" stroke="var(--accent-pink)" strokeWidth={2} fillOpacity={1} fill="url(#colorNonFollower)" />
                <Area type="monotone" dataKey="followers" name="Followers" stroke="var(--accent-purple)" strokeWidth={2} fillOpacity={1} fill="url(#colorFollower)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-glass p-6 lg:p-8">
          <h2 className="mb-6 font-['Outfit'] text-[18px] font-bold text-text-contrast">Reach by Format</h2>
          <div className="relative h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.formatData || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {(data?.formatData || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Inner Label */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-(--text-tertiary)">Top Format</span>
              <span className="font-['Outfit'] text-[24px] font-bold text-text-contrast">Reels</span>
            </div>
          </div>
          {/* Custom Legend */}
          <div className="mt-4 flex flex-col gap-2">
            {(data?.formatData || []).map((item: any, i: number) => (
              <div key={item.name} className="flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: PIE_COLORS[i] }}></div>
                  <span className="text-(--text-secondary)">{item.name}</span>
                </div>
                <span className="font-bold text-text-contrast">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="mb-8 grid gap-8 lg:grid-cols-2">
        {/* Engagement Progression */}
        <div className="surface-glass p-6 lg:p-8">
          <h2 className="mb-6 font-['Outfit'] text-[18px] font-bold text-text-contrast">Engagement Rate Trend</h2>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.engagementData || []} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-strong)" opacity={0.5} />
                <XAxis dataKey="date" stroke="var(--text-tertiary)" fontSize={11} tickMargin={10} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-tertiary)" fontSize={11} tickFormatter={(val) => `${val}%`} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-strong)', strokeWidth: 1 }} />
                <Line type="monotone" dataKey="rate" name="Rate" stroke="var(--green)" strokeWidth={3} dot={{ r: 4, fill: "var(--bg-card)", stroke: "var(--green)", strokeWidth: 2 }} activeDot={{ r: 6, fill: "var(--green)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Follower Growth Flow */}
        <div className="surface-glass p-6 lg:p-8">
          <h2 className="mb-6 font-['Outfit'] text-[18px] font-bold text-text-contrast">Follower Flow</h2>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.followerData || []} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-strong)" opacity={0.5} />
                <XAxis dataKey="date" stroke="var(--text-tertiary)" fontSize={11} tickMargin={10} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-tertiary)" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-overlay)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)' }} />
                <Bar dataKey="gained" name="Gained" fill="var(--accent-pink)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="lost" name="Lost" fill="var(--red)" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Post Performance Table */}
      <div className="surface-glass overflow-hidden">
        <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-raised)] px-6 py-5 flex items-center justify-between">
          <h2 className="font-['Outfit'] text-[18px] font-bold text-text-contrast">Recent Content Performance</h2>
          <button className="flex items-center gap-1.5 text-[13px] font-medium text-accent-pink hover:text-text-contrast transition-colors">
            <Filter size={14} /> Filter
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-[var(--bg-surface)] text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:text-text-contrast" onClick={() => requestSort("date")}>Post</th>
                <th className="px-6 py-4">Format</th>
                <th className="px-6 py-4 cursor-pointer hover:text-text-contrast" onClick={() => requestSort("reach")}>Reach</th>
                <th className="px-6 py-4 cursor-pointer hover:text-text-contrast" onClick={() => requestSort("engagement")}>Engagement</th>
                <th className="px-6 py-4 cursor-pointer hover:text-text-contrast" onClick={() => requestSort("shares")}>Shares</th>
                <th className="px-6 py-4">AI Insight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle bg-bg-base">
              {(sortedPosts || []).map((post: any) => (
                <tr key={post.id} className="transition-colors hover:bg-bg-overlay">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-bg-raised text-xl">
                        {post.thumbnail}
                      </div>
                      <div>
                        <div className="mb-1 font-medium text-text-contrast line-clamp-1 max-w-[200px]">{post.caption}</div>
                        <div className="flex items-center gap-1 text-[12px] text-(--text-tertiary)">
                          <Calendar size={12} /> {post.date}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-md border border-border-subtle bg-bg-raised px-2.5 py-1 text-[12px] font-medium text-(--text-secondary)">
                      {post.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-text-contrast">{post.reach}</td>
                  <td className="px-6 py-4 font-semibold text-text-contrast">{post.engagement}</td>
                  <td className="px-6 py-4 font-semibold text-text-contrast">{post?.shares?.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {post.aiOptimized ? (
                      <div className="flex w-max items-center gap-1.5 rounded-full border border-green/20 bg-green/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-green shadow-inner">
                        <Sparkles size={12} /> AI Optimised
                      </div>
                    ) : (
                      <div className="flex w-max items-center gap-1.5 rounded-full border border-border-strong bg-bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-(--text-tertiary) shadow-inner">
                        Manual Post
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
