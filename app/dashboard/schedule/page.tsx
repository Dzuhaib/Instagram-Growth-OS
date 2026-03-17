"use client";
import { useState, useEffect } from "react";
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

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface ScheduleData {
  stats: { label: string; value: string; sub: string; icon: string }[];
  timeSlots: { time: string; scores: number[] }[];
  nextWindow: string;
  nextReason: string;
  nuances: { title: string; text: string }[];
}

export default function SchedulePage() {
  const [selectedFormat, setSelectedFormat] = useState("Reel");
  const [downloading, setDownloading] = useState(false);
  const [data, setData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [niche, setNiche] = useState("");
  const [realFollowers, setRealFollowers] = useState<number | null>(null);

  useEffect(() => {
    setNiche(localStorage.getItem("growth_os_niche") || "General");
    
    // Fetch live follower count to inject into AI stats
    fetch("/api/instagram/profile")
      .then(res => res.json())
      .then(igJson => {
        if (igJson.followers_count !== undefined) {
          setRealFollowers(igJson.followers_count);
        }
      })
      .catch(err => console.error("Failed to fetch IG profile for schedule:", err));
  }, []);

  const fetchSchedule = async () => {
    setLoading(true);
    const storedNiche = localStorage.getItem("growth_os_niche") || "General";
    const goal = localStorage.getItem("growth_os_goal") || "Growth";
    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: storedNiche, goal, format: selectedFormat }),
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
    fetchSchedule();
  }, [selectedFormat]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Video": return Video;
      case "Sparkles": return Sparkles;
      case "AlertTriangle": return AlertTriangle;
      default: return Sparkles;
    }
  };

  const handleExportICS = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//GrowthOS//EN\nBEGIN:VEVENT\nSUMMARY:Post Instagram ${selectedFormat}\nDTSTART:20260601T180000Z\nDTEND:20260601T183000Z\nDESCRIPTION:Optimal posting time predicted by GrowthOS AI.\nEND:VEVENT\nEND:VCALENDAR`;
      const blob = new Blob([icsData], { type: "text/calendar" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `growth_os_${selectedFormat.toLowerCase()}_schedule.ics`;
      a.click();
      URL.revokeObjectURL(url);
    }, 1500);
  };

  const getSlotColor = (score: number) => {
    if (score >= 85) return "bg-green";
    if (score >= 60) return "bg-accent-cyan";
    if (score >= 40) return "bg-amber";
    return "bg-bg-raised";
  };

  const getSlotOpacity = (score: number) => {
    if (score >= 85) return "opacity-100 shadow-[0_0_10px_var(--green-dim)] border-green";
    if (score >= 60) return "opacity-80 border-accent-cyan";
    if (score >= 40) return "opacity-60 border-border-strong";
    return "opacity-30 border-transparent";
  };

  return (
    <div className="pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2 flex items-center gap-2">
            <CalendarIcon className="text-accent-cyan" size={28} /> AI Posting Schedule
          </h1>
          <p className="text-[15px] text-(--text-secondary)">
            Your personalized <strong className="text-text-contrast">{niche}</strong> posting matrix.
          </p>
        </div>
        
        <div className="flex border border-border-strong bg-bg-raised rounded-lg p-1 shadow-inner h-[44px]">
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
                  ? "bg-bg-surface text-text-contrast shadow-sm border border-border-subtle"
                  : "text-(--text-tertiary) hover:text-text-contrast"
              }`}
            >
              {f.icon} {f.id}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-5 sm:grid-cols-3">
        {loading && [1, 2, 3].map((i) => (
          <div key={i} className="surface-glass p-6 h-[100px] animate-pulse bg-bg-raised" />
        ))}
        {!loading && data?.stats?.map((stat, i) => {
          const Icon = getIcon(stat.icon);
          
          // Inject real data if it's the followers stat! (The AI usually generates random dummy numbers for this)
          let displayValue = stat.value;
          let displayLabel = stat.label;
          let displaySub = stat.sub;
          
          if (stat.label.toLowerCase().includes("follower")) {
            displayLabel = "Current Followers";
            displaySub = "Live Instagram Data";
            displayValue = realFollowers !== null ? realFollowers.toLocaleString() : "Syncing...";
          }

          return (
            <div key={i} className="surface-glass p-6 flex items-start gap-4">
              <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-bg-raised border border-border-subtle shadow-inner">
                <Icon size={20} className="text-accent-pink" />
              </div>
              <div>
                <div className="mb-1 font-['Outfit'] text-[22px] font-bold tracking-tight text-text-contrast leading-none flex items-center gap-1.5">
                  {displayValue} 
                  {realFollowers !== null && stat.label.toLowerCase().includes("follower") && (
                     <CheckCircle2 size={12} className="text-green" />
                  )}
                </div>
                <div className="mb-1 text-[13px] font-semibold text-(--text-secondary)">{displayLabel}</div>
                <div className="text-[12px] text-(--text-tertiary)">{displaySub}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main Matrix */}
        <div className="surface-glass p-6 md:p-8 overflow-hidden">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-['Outfit'] text-[20px] font-bold text-text-contrast flex items-center gap-2">
              <CalendarIcon size={18} className="text-accent-cyan" /> The optimal {selectedFormat} window
            </h2>
            <div className="flex items-center gap-3">
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-bg-raised transition-colors hover:bg-bg-overlay hover:text-text-contrast">
                <ChevronLeft size={16} />
              </button>
              <span className="text-[13px] font-semibold">Active Cycle</span>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-bg-raised transition-colors hover:bg-bg-overlay hover:text-text-contrast">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="min-w-[600px]">
               {/* Grid Header */}
              <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-2 mb-4">
                <div className="text-[11px] font-semibold text-(--text-tertiary) flex items-end pb-2 uppercase tracking-wide">Time</div>
                {WEEK_DAYS.map((day) => (
                  <div key={day} className="text-center">
                    <div className="text-[12px] font-semibold text-text-contrast bg-bg-raised border border-border-subtle rounded-md py-1.5 shadow-inner">
                      {day}
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid Body */}
              <div className="flex flex-col gap-2">
                {loading && (
                   <div className="flex items-center justify-center h-[200px] text-[--text-tertiary] text-sm">
                      <Sparkles size={16} className="animate-spin mr-2" />
                      Crunching audience signals...
                   </div>
                )}
                {!loading && data?.timeSlots?.map((slot, i) => (
                  <div key={i} className="grid grid-cols-[60px_repeat(7,1fr)] gap-2 items-center">
                    <div className="text-[11px] font-medium text-[--text-secondary]">{slot.time}</div>
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
          <div className="mt-8 flex items-center gap-6 border-t border-border-subtle pt-6 text-[12px] font-medium text-(--text-secondary)">
            <span className="uppercase tracking-widest font-semibold text-[10px]">Algorithm Match:</span>
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-green"></div> <span className="text-text-contrast font-bold">Optimal</span> (85-100)</div>
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-accent-cyan"></div> Good (60-84)</div>
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-amber"></div> Fair (40-59)</div>
          </div>
        </div>

        {/* Right Sidebar - Logic/Export */}
        <div className="flex flex-col gap-6">
          <div className="surface-glass border-accent-cyan/30 bg-gradient-to-b from-bg-surface to-bg-raised p-6 shadow-lg shadow-accent-cyan/5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-['Outfit'] text-[16px] font-bold text-text-contrast flex items-center gap-2">
                <Sparkles size={16} className="text-accent-cyan" /> Next Action Window
              </h3>
            </div>
            <div className="mb-1 text-[28px] font-['Outfit'] font-black tracking-tight text-text-contrast drop-shadow-md">
              {data?.nextWindow || "Calculating..."}
            </div>
            <div className="mb-4 flex items-center gap-2 text-[13px] font-bold text-green uppercase tracking-wide">
              <Target size={14} /> Highly Recommended
            </div>
            <div className="mb-6 rounded-lg bg-bg-overlay p-3 text-[12.5px] leading-relaxed text-text-primary border border-border-subtle shadow-inner">
              {data?.nextReason || "AI is scanning your follower heatmaps."}
            </div>
            <button
              onClick={handleExportICS}
              disabled={downloading || !data}
              className="btn-accent w-full justify-center h-10 shadow-[0_4px_14px_var(--accent-cyan-dim)] text-[14px]"
            >
              {downloading ? (
                <><ChevronRight size={16} className="animate-spin" /> Generating .ics...</>
              ) : (
                <><Download size={16} /> Sync to Calendar</>
              )}
            </button>
          </div>

          <div className="surface-glass p-6 border-border-subtle">
             <h3 className="mb-4 font-['Outfit'] text-[15px] font-bold text-text-contrast flex items-center gap-2">
                <Lightbulb size={16} className="text-amber" /> Format Nuances
              </h3>
              <ul className="flex flex-col gap-4">
                {(data?.nuances || []).map((nuance, i) => (
                  <li key={i} className="flex gap-3 text-[13px] leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber/10 text-amber border border-amber/20">
                      <CheckCircle2 size={12} strokeWidth={3} />
                    </span>
                    <span className="text-(--text-secondary)"><strong className="text-text-primary">{nuance.title}</strong> {nuance.text}</span>
                  </li>
                ))}
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
