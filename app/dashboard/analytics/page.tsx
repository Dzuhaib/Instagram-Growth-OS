"use client";
import { useState } from "react";
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

const REACH_DATA = [
  { date: "May 1", followers: 4200, nonFollowers: 12500, total: 16700 },
  { date: "May 5", followers: 4500, nonFollowers: 18200, total: 22700 },
  { date: "May 10", followers: 4100, nonFollowers: 14000, total: 18100 },
  { date: "May 15", followers: 4800, nonFollowers: 32000, total: 36800 },
  { date: "May 20", followers: 5200, nonFollowers: 28000, total: 33200 },
  { date: "May 25", followers: 4900, nonFollowers: 45000, total: 49900 },
  { date: "May 30", followers: 5400, nonFollowers: 38000, total: 43400 },
];

const FORMAT_DATA = [
  { name: "Reels", value: 65 },
  { name: "Carousels", value: 25 },
  { name: "Single Image", value: 10 },
];

const ENGAGEMENT_DATA = [
  { date: "May 1", rate: 4.2 },
  { date: "May 5", rate: 5.1 },
  { date: "May 10", rate: 4.8 },
  { date: "May 15", rate: 6.5 },
  { date: "May 20", rate: 7.2 },
  { date: "May 25", rate: 6.8 },
  { date: "May 30", rate: 8.4 },
];

const FOLLOWER_DATA = [
  { date: "May 1", gained: 120, lost: 40 },
  { date: "May 5", gained: 150, lost: 35 },
  { date: "May 10", gained: 90, lost: 50 },
  { date: "May 15", gained: 320, lost: 45 },
  { date: "May 20", gained: 280, lost: 30 },
  { date: "May 25", gained: 410, lost: 60 },
  { date: "May 30", gained: 350, lost: 25 },
];

const POSTS = [
  {
    id: 1,
    thumbnail: "🏋️‍♂️",
    caption: "The ultimate 15-min core burner...",
    format: "Reel",
    date: "May 30",
    reach: "45.2K",
    engagement: "8.4%",
    shares: 1204,
    aiOptimized: true,
  },
  {
    id: 2,
    thumbnail: "🥗",
    caption: "Stop eating boring salads. Try this...",
    format: "Carousel",
    date: "May 28",
    reach: "28.5K",
    engagement: "7.1%",
    shares: 450,
    aiOptimized: true,
  },
  {
    id: 3,
    thumbnail: "📸",
    caption: "Weekend dump ✌️",
    format: "Single",
    date: "May 25",
    reach: "12.1K",
    engagement: "4.2%",
    shares: 12,
    aiOptimized: false,
  },
  {
    id: 4,
    thumbnail: "👟",
    caption: "How to pick the right running shoe...",
    format: "Reel",
    date: "May 22",
    reach: "85.9K",
    engagement: "11.2%",
    shares: 3400,
    aiOptimized: true,
  },
];

const PIE_COLORS = ["var(--accent-cyan)", "var(--accent-violet)", "var(--text-tertiary)"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="surface-glass rounded-lg border border-[var(--border-strong)] p-4 text-[13px] shadow-xl">
        <div className="mb-2 font-semibold text-text-contrast">{label}</div>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1">
            <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
              {entry.name}
            </span>
            <span className="font-bold text-text-contrast">
              {entry.name === "Rate" ? `${entry.value}%` : entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({ key: "date", direction: "desc" });

  const sortedPosts = [...POSTS].sort((a: any, b: any) => {
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
            <BarChart3 className="text-[var(--accent-cyan)]" size={28} /> Performance Analytics
          </h1>
          <p className="text-[15px] text-[var(--text-secondary)]">
            Deep dive into your account growth, reach formats, and AI attribution.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex rounded-lg border border-[var(--border-strong)] bg-[var(--bg-raised)] p-1">
            {["7d", "30d", "90d", "YTD"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-md px-4 py-1.5 text-[13px] font-semibold transition-all ${
                  timeRange === range
                    ? "bg-[var(--bg-surface)] text-text-contrast shadow-sm border border-[var(--border-subtle)]"
                    : "text-[var(--text-tertiary)] hover:text-text-contrast"
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
        {[
          { label: "Total Reach", value: "248.5K", trend: "+34.2%", isUp: true, icon: Eye, color: "var(--accent-cyan)" },
          { label: "Avg Engagement", value: "6.4%", trend: "+1.2%", isUp: true, icon: TrendingUp, color: "var(--green)" },
          { label: "Net Followers", value: "+1,420", trend: "+450", isUp: true, icon: Users, color: "var(--accent-violet)" },
          { label: "AI Match Rate", value: "75%", trend: "-2.4%", isUp: false, icon: Sparkles, color: "var(--amber)" },
        ].map((stat) => (
          <div key={stat.label} className="surface-glass p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[13px] font-medium text-[var(--text-secondary)]">{stat.label}</span>
              <stat.icon size={16} style={{ color: stat.color }} />
            </div>
            <div className="mb-2 font-['Outfit'] text-[32px] font-bold text-text-contrast tracking-tight leading-none">
              {stat.value}
            </div>
            <div className={`flex items-center gap-1 text-[12px] font-semibold ${stat.isUp ? "text-[var(--green)]" : "text-[var(--red)]"}`}>
              {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {stat.trend} vs last period
            </div>
          </div>
        ))}
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
              <AreaChart data={REACH_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNonFollower" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorFollower" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-violet)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--accent-violet)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-strong)" opacity={0.5} />
                <XAxis dataKey="date" stroke="var(--text-tertiary)" fontSize={11} tickMargin={10} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-tertiary)" fontSize={11} tickFormatter={(val) => `${val / 1000}k`} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-strong)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)' }} />
                <Area type="monotone" dataKey="nonFollowers" name="Non-Followers" stroke="var(--accent-cyan)" strokeWidth={2} fillOpacity={1} fill="url(#colorNonFollower)" />
                <Area type="monotone" dataKey="followers" name="Followers" stroke="var(--accent-violet)" strokeWidth={2} fillOpacity={1} fill="url(#colorFollower)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Format Breakdown (1 col) */}
        <div className="surface-glass p-6 lg:p-8">
          <h2 className="mb-6 font-['Outfit'] text-[18px] font-bold text-text-contrast">Reach by Format</h2>
          <div className="relative h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={FORMAT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {FORMAT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Inner Label */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Top Format</span>
              <span className="font-['Outfit'] text-[24px] font-bold text-text-contrast">Reels</span>
            </div>
          </div>
          {/* Custom Legend */}
          <div className="mt-4 flex flex-col gap-2">
            {FORMAT_DATA.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: PIE_COLORS[i] }}></div>
                  <span className="text-[var(--text-secondary)]">{item.name}</span>
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
              <LineChart data={ENGAGEMENT_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
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
              <BarChart data={FOLLOWER_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-strong)" opacity={0.5} />
                <XAxis dataKey="date" stroke="var(--text-tertiary)" fontSize={11} tickMargin={10} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-tertiary)" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-overlay)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)' }} />
                <Bar dataKey="gained" name="Gained" fill="var(--accent-cyan)" radius={[4, 4, 0, 0]} maxBarSize={40} />
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
          <button className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--accent-cyan)] hover:text-text-contrast transition-colors">
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
            <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-base)]">
              {sortedPosts.map((post) => (
                <tr key={post.id} className="transition-colors hover:bg-[var(--bg-overlay)]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-raised)] text-xl">
                        {post.thumbnail}
                      </div>
                      <div>
                        <div className="mb-1 font-medium text-text-contrast line-clamp-1 max-w-[200px]">{post.caption}</div>
                        <div className="flex items-center gap-1 text-[12px] text-[var(--text-tertiary)]">
                          <Calendar size={12} /> {post.date}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-raised)] px-2.5 py-1 text-[12px] font-medium text-[var(--text-secondary)]">
                      {post.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-text-contrast">{post.reach}</td>
                  <td className="px-6 py-4 font-semibold text-text-contrast">{post.engagement}</td>
                  <td className="px-6 py-4 font-semibold text-text-contrast">{post.shares.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {post.aiOptimized ? (
                      <div className="flex w-max items-center gap-1.5 rounded-full border border-[rgba(16,185,129,0.2)] bg-[var(--green-dim)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--green)] shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]">
                        <Sparkles size={12} /> AI Optimised
                      </div>
                    ) : (
                      <div className="flex w-max items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] shadow-inner">
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
