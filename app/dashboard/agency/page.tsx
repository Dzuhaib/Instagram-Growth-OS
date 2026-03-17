"use client";
import { useState, useEffect } from "react";
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

interface AgencyData {
  summary: any[];
  clients: any[];
}

export default function AgencyPage() {
  const [data, setData] = useState<AgencyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [reportExported, setReportExported] = useState<number | null>(null);

  const fetchAgencyData = async () => {
    setLoading(true);
    const niche = localStorage.getItem("growth_os_niche") || "Agency Management";
    const goal = localStorage.getItem("growth_os_goal") || "Client Growth";
    
    try {
      const response = await fetch("/api/agency", {
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
    fetchAgencyData();
  }, []);

  const handleExportReport = (id: number) => {
    setReportExported(id);
    setTimeout(() => setReportExported(null), 2000);
  };

  const getSummaryIcon = (iconName: string) => {
    switch (iconName) {
      case "Target": return Target;
      case "TrendingUp": return TrendingUp;
      case "BarChart3": return BarChart3;
      case "AlertTriangle": return AlertTriangle;
      default: return Target;
    }
  };

  return (
    <div className="pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent-pink/20 bg-accent-pink/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent-pink shadow-inner">
            <Users size={12} strokeWidth={2.5} /> Agency Hub
          </div>
          <h1 className="font-Heading text-3xl font-bold tracking-tight text-text-contrast mb-2">
            Client Overview
          </h1>
          <p className="text-[15px] text-text-secondary">
            Command Center for all connected accounts. Monitor health, switch scopes, and generate reports.
          </p>
        </div>
        <button className="btn-accent shrink-0 text-[13px] px-6 h-10 shadow-[0_4px_20px_rgba(225,48,108,0.2)]">
          <Plus size={16} /> Link New Account
        </button>
      </div>

      {/* Agency Summary */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading && [1, 2, 3, 4].map((i) => (
          <div key={i} className="surface-glass p-6 h-[100px] animate-pulse bg-bg-raised" />
        ))}
        {!loading && data?.summary?.map((s) => {
          const Icon = getSummaryIcon(s.icon);
          return (
            <div key={s.label} className="surface-glass p-6 transition-all hover:border-border-strong">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary">{s.label}</span>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <div className="font-Heading text-[32px] font-bold tracking-tight leading-none text-text-contrast drop-shadow-sm">
                {s.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Client Cards Grid */}
      <div className="surface-glass p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between border-b border-border-subtle pb-4">
          <h2 className="font-Heading text-[20px] font-bold text-text-contrast flex items-center gap-2">
            <LinkIcon size={18} className="text-accent-pink" /> Linked Accounts
          </h2>
          <div className="text-[13px] font-medium text-(--text-tertiary) hidden sm:block">Active connections: {(data?.clients || []).length}/10</div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {loading && (
             <div className="col-span-full flex flex-col items-center justify-center py-20 text-text-tertiary">
                <Sparkles size={32} className="animate-spin mb-4 text-accent-pink" />
                <p className="font-medium">Aggregating client performance data...</p>
             </div>
          )}
          {!loading && data?.clients?.map((client) => {
            const isSelected = selected === client.id;
            return (
              <div
                key={client.id}
                onClick={() => setSelected(isSelected ? null : client.id)}
                className={`relative cursor-pointer overflow-hidden rounded-xl border bg-bg-raised p-5 transition-all duration-300 ${
                  isSelected 
                    ? "border-accent-pink shadow-[0_4px_20px_rgba(225,48,108,0.2)] translate-y-[-2px]" 
                    : "border-border-subtle hover:border-border-strong"
                }`}
              >
                {/* Status Indicator */}
                  <div className="absolute right-3 top-3">
                    <span className="relative flex h-2.5 w-2.5">
                      {client.trend === "up" && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75"></span>}
                      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${client.trend === "up" ? "bg-green" : "bg-red"}`}></span>
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
                    <div className="text-[12px] font-medium text-(--text-secondary)">{client.handle} · {client.followers} followers</div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="mb-5 grid grid-cols-3 gap-2 divide-x divide-border-subtle rounded-lg border border-border-subtle bg-bg-surface py-3 shadow-inner">
                  <div className="text-center">
                    <div className="mb-0.5 font-Heading text-[16px] font-bold text-text-primary">{client.weeklyReach}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">Reach</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-0.5 font-Heading text-[16px] font-bold text-text-primary">{client.engagement}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">Eng %</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-0.5 font-Heading text-[16px] font-bold" style={{ color: client.nicheScore >= 80 ? 'var(--green)' : 'var(--amber)' }}>{client.nicheScore}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">Niche</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <button className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md border border-border-strong bg-bg-surface text-[12px] font-semibold text-text-primary transition-colors hover:bg-bg-overlay hover:text-text-contrast">
                    <Eye size={14} /> Dashboard
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleExportReport(client.id); }}
                    className={`flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md border text-[12px] font-semibold transition-colors ${
                      reportExported === client.id 
                        ? "border-green/30 bg-green/10 text-green" 
                        : "border-border-strong bg-bg-surface text-text-primary hover:bg-bg-overlay hover:text-text-contrast"
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
      <div className="surface-glass mt-8 flex flex-col items-center justify-between gap-6 p-6 md:p-8 sm:flex-row border border-accent-pink/20 shadow-[0_8px_30px_rgba(225,48,108,0.1)]">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-pink to-accent-purple shadow-inner text-white">
            <Sparkles size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="mb-1 font-Heading text-[18px] font-bold text-text-contrast">White-Label Client Reports</h3>
            <p className="text-[14px] leading-relaxed text-text-secondary max-w-xl">
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
