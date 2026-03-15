"use client";
import { useState } from "react";
import {
  Users,
  TrendingUp,
  BarChart3,
  Plus,
  ChevronRight,
  Download,
  Target,
  Zap,
  Eye,
  FileText,
  ArrowUpRight,
  Sparkles,
  Link as LinkIcon,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const CLIENTS = [
  {
    id: 1,
    name: "FitLife by Sarah",
    handle: "@fitlife_sarah",
    followers: "48.2K",
    weeklyReach: "142K",
    engagement: "6.8%",
    nicheScore: 94,
    lastPost: "2h ago",
    trend: "up",
    avatar: "S",
    avatar_color: "var(--accent-cyan)",
  },
  {
    id: 2,
    name: "Chef Marco",
    handle: "@chefmarco",
    followers: "112K",
    weeklyReach: "387K",
    engagement: "8.2%",
    nicheScore: 89,
    lastPost: "4h ago",
    trend: "up",
    avatar: "M",
    avatar_color: "var(--green)",
  },
  {
    id: 3,
    name: "Priya Travels",
    handle: "@priyatravels",
    followers: "28.7K",
    weeklyReach: "61K",
    engagement: "5.4%",
    nicheScore: 71,
    lastPost: "1d ago",
    trend: "down",
    avatar: "P",
    avatar_color: "var(--amber)",
  },
  {
    id: 4,
    name: "TechTalks HQ",
    handle: "@techtalks",
    followers: "67.3K",
    weeklyReach: "218K",
    engagement: "7.1%",
    nicheScore: 87,
    lastPost: "6h ago",
    trend: "up",
    avatar: "T",
    avatar_color: "var(--accent-violet)",
  },
];

export default function AgencyPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [reportExported, setReportExported] = useState<number | null>(null);

  const handleExportReport = (id: number) => {
    setReportExported(id);
    setTimeout(() => setReportExported(null), 2000);
  };

  const totalReach = CLIENTS.reduce((s, c) => s + parseFloat(c.weeklyReach), 0);
  const avgEngagement = (CLIENTS.reduce((s, c) => s + parseFloat(c.engagement), 0) / CLIENTS.length).toFixed(1);

  return (
    <div className="pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--border-accent)] bg-[var(--accent-cyan-dim)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--accent-cyan)] shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]">
            <Users size={12} strokeWidth={2.5} /> Agency Hub
          </div>
          <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2">
            Client Overview
          </h1>
          <p className="text-[15px] text-[var(--text-secondary)]">
            Command Center for all connected accounts. Monitor health, switch scopes, and generate reports.
          </p>
        </div>
        <button className="btn-accent shrink-0 text-[13px] px-6 h-10 shadow-[0_4px_20px_var(--accent-cyan-dim)]">
          <Plus size={16} /> Link New Account
        </button>
      </div>

      {/* Agency Summary */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Subscriptions", value: CLIENTS.length.toString(), color: "var(--accent-cyan)", icon: Target },
          { label: "Combined Network Reach", value: `${totalReach.toFixed(0)}K`, color: "var(--green)", icon: TrendingUp },
          { label: "Average Engagement", value: `${avgEngagement}%`, color: "var(--amber)", icon: BarChart3 },
          { label: "Critical Alerts", value: "3", color: "var(--red)", icon: AlertTriangle },
        ].map((s) => (
          <div key={s.label} className="surface-glass p-6 transition-all hover:border-[var(--border-strong)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">{s.label}</span>
              <s.icon size={16} style={{ color: s.color }} />
            </div>
            <div className="font-['Outfit'] text-[32px] font-bold tracking-tight leading-none text-text-contrast drop-shadow-sm">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Client Cards Grid */}
      <div className="surface-glass p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <h2 className="font-['Outfit'] text-[20px] font-bold text-text-contrast flex items-center gap-2">
            <LinkIcon size={18} className="text-[var(--accent-cyan)]" /> Linked Accounts
          </h2>
          <div className="text-[13px] font-medium text-[var(--text-tertiary)] hidden sm:block">Active connections: {CLIENTS.length}/10</div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {CLIENTS.map((client) => {
            const isSelected = selected === client.id;
            return (
              <div
                key={client.id}
                onClick={() => setSelected(isSelected ? null : client.id)}
                className={`relative cursor-pointer overflow-hidden rounded-xl border bg-[var(--bg-raised)] p-5 transition-all duration-300 ${
                  isSelected 
                    ? "border-[var(--accent-cyan)] shadow-[0_0_20px_var(--accent-cyan-dim)] translate-y-[-2px]" 
                    : "border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                }`}
              >
                {/* Status Indicator */}
                <div className="absolute right-3 top-3">
                  <span className="relative flex h-2.5 w-2.5">
                    {client.trend === "up" && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75"></span>}
                    <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${client.trend === "up" ? "bg-[var(--green)]" : "bg-[var(--red)]"}`}></span>
                  </span>
                </div>

                {/* Header */}
                <div className="mb-5 flex items-center gap-4">
                  <div 
                    className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl font-['Outfit'] text-[20px] font-black text-bg-base shadow-inner"
                    style={{ background: client.avatar_color }}
                  >
                    {client.avatar}
                  </div>
                  <div>
                    <div className="font-['Outfit'] text-[16px] font-bold text-text-contrast leading-tight mb-0.5">{client.name}</div>
                    <div className="text-[12px] font-medium text-[var(--text-secondary)]">{client.handle} · {client.followers} followers</div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="mb-5 grid grid-cols-3 gap-2 divide-x divide-[var(--border-subtle)] rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] py-3 shadow-inner">
                  <div className="text-center">
                    <div className="mb-0.5 font-['Outfit'] text-[16px] font-bold text-[var(--text-primary)]">{client.weeklyReach}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">Reach</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-0.5 font-['Outfit'] text-[16px] font-bold text-[var(--text-primary)]">{client.engagement}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">Eng %</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-0.5 font-['Outfit'] text-[16px] font-bold" style={{ color: client.nicheScore >= 80 ? 'var(--green)' : 'var(--amber)' }}>{client.nicheScore}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">Niche</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <button className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[12px] font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-overlay)] hover:text-text-contrast">
                    <Eye size={14} /> Dashboard
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleExportReport(client.id); }}
                    className={`flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md border text-[12px] font-semibold transition-colors ${
                      reportExported === client.id 
                        ? "border-[rgba(16,185,129,0.3)] bg-[var(--green-dim)] text-[var(--green)]" 
                        : "border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] hover:text-text-contrast"
                    }`}
                  >
                    {reportExported === client.id ? (
                      <><CheckCircle2 size={14} /> Exported!</>
                    ) : (
                      <><FileText size={14} /> PDF Report</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* White Label Promo Card */}
      <div className="surface-glass mt-8 flex flex-col items-center justify-between gap-6 p-6 md:p-8 sm:flex-row border border-[var(--border-accent)] shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-cyan)] to-[#0077FF] shadow-inner text-bg-base">
            <Sparkles size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="mb-1 font-['Outfit'] text-[18px] font-bold text-text-contrast">White-Label Client Reports</h3>
            <p className="text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-xl">
              Export branded PDF performance reports automatically. Show monthly reach, engagement trends, and exactly how AI recommendations generated growth. Put your agency's logo on it, we remain invisible.
            </p>
          </div>
        </div>
        <button className="btn-accent shrink-0 h-11 px-6 shadow-md">
          <Download size={16} /> Batch Export All
        </button>
      </div>
    </div>
  );
}
