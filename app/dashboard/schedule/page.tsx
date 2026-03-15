"use client";
import { useState } from "react";
import {
  Calendar as CalendarIcon,
  Video,
  Image as ImageIcon,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Download,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Target,
} from "lucide-react";

const STATS = [
  { label: "Optimal Format", value: "Reels", sub: "Drives 65% of reach", icon: Video, color: "var(--accent-cyan)" },
  { label: "Peak Engagement Window", value: "18:00 - 20:00", sub: "Avg Eng. Rate: 8.4%", icon: Sparkles, color: "var(--accent-violet)" },
  { label: "Recommended Frequency", value: "4x Weekly", sub: "Currently missing 1 slot", icon: AlertTriangle, color: "var(--amber)" },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Mock scoring matrix for a generic week
const TIME_SLOTS = [
  { time: "09:00", scores: [30, 45, 60, 40, 50, 85, 90] },
  { time: "12:00", scores: [55, 65, 80, 70, 75, 95, 85] },
  { time: "15:00", scores: [45, 50, 40, 55, 60, 70, 65] },
  { time: "18:00", scores: [85, 95, 90, 85, 100, 75, 60] },
  { time: "20:00", scores: [95, 85, 100, 90, 85, 60, 45] },
];

export default function SchedulePage() {
  const [selectedFormat, setSelectedFormat] = useState("Reel");
  const [downloading, setDownloading] = useState(false);

  const handleExportICS = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//GrowthOS//EN\nBEGIN:VEVENT\nSUMMARY:Post Instagram Reel\nDTSTART:20260601T180000Z\nDTEND:20260601T183000Z\nDESCRIPTION:Optimal posting time predicted by GrowthOS AI.\nEND:VEVENT\nEND:VCALENDAR`;
      const blob = new Blob([icsData], { type: "text/calendar" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "growth_os_schedule.ics";
      a.click();
      URL.revokeObjectURL(url);
    }, 1500);
  };

  const getSlotColor = (score: number) => {
    if (score >= 85) return "bg-[var(--green)]";
    if (score >= 60) return "bg-[var(--accent-cyan)]";
    if (score >= 40) return "bg-[var(--amber)]";
    return "bg-[var(--bg-raised)]";
  };

  const getSlotOpacity = (score: number) => {
    if (score >= 85) return "opacity-100 shadow-[0_0_10px_var(--green-dim)] border-[var(--green)]";
    if (score >= 60) return "opacity-80 border-[var(--accent-cyan)]";
    if (score >= 40) return "opacity-60 border-[var(--border-strong)]";
    return "opacity-30 border-transparent";
  };

  return (
    <div className="pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2 flex items-center gap-2">
            <CalendarIcon className="text-[var(--accent-cyan)]" size={28} /> AI Posting Schedule
          </h1>
          <p className="text-[15px] text-[var(--text-secondary)]">
            Your personalized posting matrix based on peak follower activity.
          </p>
        </div>
        
        <div className="flex border border-[var(--border-strong)] bg-[var(--bg-raised)] rounded-lg p-1 shadow-inner h-[44px]">
          {[
            { id: "Reel", icon: <Video size={14} /> },
            { id: "Carousel", icon: <ImageIcon size={14} /> },
            { id: "Story", icon: <Smartphone size={14} /> }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFormat(f.id)}
              className={`flex items-center gap-2 px-4 rounded-md text-[13px] font-semibold transition-all ${
                selectedFormat === f.id
                  ? "bg-[var(--bg-surface)] text-text-contrast shadow-sm border border-[var(--border-subtle)]"
                  : "text-[var(--text-tertiary)] hover:text-text-contrast"
              }`}
            >
              {f.icon} {f.id}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-5 sm:grid-cols-3">
        {STATS.map((stat, i) => (
          <div key={i} className="surface-glass p-6 flex items-start gap-4">
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[var(--bg-raised)] border border-[var(--border-subtle)] shadow-inner">
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div>
              <div className="mb-1 font-['Outfit'] text-[22px] font-bold tracking-tight text-text-contrast leading-none">{stat.value}</div>
              <div className="mb-1 text-[13px] font-semibold text-[var(--text-secondary)]">{stat.label}</div>
              <div className="text-[12px] text-[var(--text-tertiary)]">{stat.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main Matrix */}
        <div className="surface-glass p-6 md:p-8 overflow-hidden">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-['Outfit'] text-[20px] font-bold text-text-contrast flex items-center gap-2">
              <CalendarIcon size={18} className="text-[var(--accent-cyan)]" /> The optimal {selectedFormat} window
            </h2>
            <div className="flex items-center gap-3">
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-raised)] transition-colors hover:bg-[var(--bg-overlay)] hover:text-text-contrast">
                <ChevronLeft size={16} />
              </button>
              <span className="text-[13px] font-semibold">Jun 1 - Jun 7</span>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-raised)] transition-colors hover:bg-[var(--bg-overlay)] hover:text-text-contrast">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="min-w-[600px]">
               {/* Grid Header */}
              <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-2 mb-4">
                <div className="text-[11px] font-semibold text-[var(--text-tertiary)] flex items-end pb-2 uppercase tracking-wide">Time</div>
                {WEEK_DAYS.map((day) => (
                  <div key={day} className="text-center">
                    <div className="text-[12px] font-semibold text-text-contrast bg-[var(--bg-raised)] border border-[var(--border-subtle)] rounded-md py-1.5 shadow-inner">
                      {day}
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid Body */}
              <div className="flex flex-col gap-2">
                {TIME_SLOTS.map((slot, i) => (
                  <div key={i} className="grid grid-cols-[60px_repeat(7,1fr)] gap-2 items-center">
                    <div className="text-[11px] font-medium text-[var(--text-secondary)]">{slot.time}</div>
                    {slot.scores.map((score, idx) => (
                      <div key={idx} className="relative h-12 w-full group cursor-pointer">
                        <div 
                          className={`absolute inset-0 rounded-md border ${getSlotColor(score)} ${getSlotOpacity(score)} transition-all duration-300 group-hover:scale-105 group-hover:z-10`}
                        >
                           <div className="flex h-full w-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <span className="text-[11px] font-bold text-bg-base bg-text-contrast/90 px-1.5 py-0.5 rounded-sm">{score}</span>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 flex items-center gap-6 border-t border-[var(--border-subtle)] pt-6 text-[12px] font-medium text-[var(--text-secondary)]">
            <span className="uppercase tracking-widest font-semibold text-[10px]">Algorithm Match:</span>
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-[var(--green)]"></div> <span className="text-text-contrast font-bold">Optimal</span> (85-100)</div>
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-[var(--accent-cyan)]"></div> Good (60-84)</div>
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-[var(--amber)]"></div> Fair (40-59)</div>
          </div>
        </div>

        {/* Right Sidebar - Logic/Export */}
        <div className="flex flex-col gap-6">
          <div className="surface-glass border-[var(--accent-cyan-dim)] bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-raised)] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-['Outfit'] text-[16px] font-bold text-text-contrast flex items-center gap-2">
                <Sparkles size={16} className="text-[var(--accent-cyan)]" /> Next Action Window
              </h3>
            </div>
            <div className="mb-1 text-[28px] font-['Outfit'] font-black tracking-tight text-text-contrast drop-shadow-md">
              Today at 18:00
            </div>
            <div className="mb-4 flex items-center gap-2 text-[13px] font-bold text-[var(--green)] uppercase tracking-wide">
              <Target size={14} /> Highly Recommended
            </div>
            <div className="mb-6 rounded-lg bg-[var(--bg-overlay)] p-3 text-[12.5px] leading-relaxed text-[var(--text-primary)] border border-[var(--border-subtle)]">
              Your engaged audience spikes at 6PM on Mondays. Posting a Reel now will catch the commuting traffic, leading to higher initial velocity.
            </div>
            <button
              onClick={handleExportICS}
              disabled={downloading}
              className="btn-accent w-full justify-center h-10 shadow-[0_4px_14px_var(--accent-cyan-dim)] text-[14px]"
            >
              {downloading ? (
                <><ChevronRight size={16} className="animate-spin" /> Generating .ics...</>
              ) : (
                <><Download size={16} /> Sync to Calendar</>
              )}
            </button>
          </div>

          <div className="surface-glass p-6 border-[var(--border-subtle)]">
             <h3 className="mb-4 font-['Outfit'] text-[15px] font-bold text-text-contrast flex items-center gap-2">
                <Lightbulb size={16} className="text-[var(--amber)]" /> Format Nuances
              </h3>
              <ul className="flex flex-col gap-4">
                <li className="flex gap-3 text-[13px] leading-relaxed">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--amber-dim)] text-[var(--amber)]">
                    <CheckCircle2 size={12} strokeWidth={3} />
                  </span>
                  <span className="text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">Reels</strong> perform 45% better when posted right before peak times to build velocity.</span>
                </li>
                <li className="flex gap-3 text-[13px] leading-relaxed">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--amber-dim)] text-[var(--amber)]">
                    <CheckCircle2 size={12} strokeWidth={3} />
                  </span>
                  <span className="text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">Carousels</strong> perform best mid-day when users have time to swipe through text.</span>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
