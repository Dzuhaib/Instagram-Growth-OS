"use client";
import { useState, useEffect } from "react";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  Copy,
  ChevronDown,
  RefreshCw,
  Zap,
} from "lucide-react";

const TONES = ["Educational", "Motivational", "Controversial", "Storytelling", "Humorous"];
const FORMATS = ["Reel", "Carousel", "Single Image"];

interface CaptionResult {
  id: number;
  style: string;
  text: string;
  hashtags: string;
  score: number;
}

export default function CaptionGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Educational");
  const [format, setFormat] = useState("Reel");
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<CaptionResult[] | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [showTones, setShowTones] = useState(false);
  const [niche, setNiche] = useState("");

  useEffect(() => {
    setNiche(localStorage.getItem("growth_os_niche") || "General");
  }, []);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateCaptions = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setResults(null);
    try {
      const response = await fetch("/api/generate-captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tone, format, niche }),
      });
      if (!response.ok) throw new Error("Failed to generate captions");
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      alert("Error generating captions. Make sure your OpenAI API key is configured.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2 flex items-center gap-2">
            <FileText className="text-accent-cyan" size={28} /> Caption Generator
          </h1>
          <p className="text-[15px] text-(--text-secondary)">
            Create high-converting captions tailored to your <strong className="text-text-contrast">{niche}</strong> audience.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
        {/* Left Column: Config */}
        <div className="flex flex-col gap-6">
          <div className="surface-glass p-6 md:p-8">
            <h2 className="mb-6 font-['Outfit'] text-[18px] font-bold text-text-contrast flex items-center gap-2">
              <Sparkles size={18} className="text-accent-cyan" /> Context Engine
            </h2>

            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-(--text-secondary)">What is the post about?</label>
              <textarea
                className="input-field min-h-[140px] bg-bg-raised font-medium font-['Inter'] leading-relaxed shadow-inner text-[14px]"
                placeholder="E.g. 3 ways to achieve X. Mention my free guide in the bio."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
               <div>
                  <label className="mb-3 block text-[13px] font-semibold text-(--text-secondary)">Tone</label>
                  <div className="relative">
                     <button 
                        onClick={() => setShowTones(!showTones)}
                        className="flex h-11 w-full items-center justify-between rounded-lg border border-border-subtle bg-bg-raised px-4 text-[13px] font-semibold text-text-contrast transition-colors hover:border-accent-cyan"
                     >
                        {tone} <ChevronDown size={14} className="text-(--text-tertiary)" />
                     </button>
                     {showTones && (
                        <div className="absolute top-[calc(100%+4px)] left-0 z-10 w-full overflow-hidden rounded-lg border border-border-strong bg-bg-surface shadow-xl animate-in zoom-in-95 duration-150">
                           {TONES.map(t => (
                              <button 
                                 key={t}
                                 onClick={() => { setTone(t); setShowTones(false); }}
                                 className="w-full px-4 py-2.5 text-left text-[13px] font-medium text-text-primary hover:bg-bg-overlay hover:text-text-contrast transition-colors"
                              >
                                 {t}
                              </button>
                           ))}
                        </div>
                     )}
                  </div>
               </div>

               <div>
                 <label className="mb-3 block text-[13px] font-semibold text-(--text-secondary)">Format</label>
                 <select 
                    value={format} 
                    onChange={(e) => setFormat(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-border-subtle bg-bg-raised px-4 text-[13px] font-semibold text-text-contrast transition-colors focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan"
                 >
                    {FORMATS.map(f => (
                       <option key={f} value={f}>{f}</option>
                    ))}
                 </select>
               </div>
            </div>

            <button
              className="btn-accent w-full justify-center h-12 text-[15px] shadow-[0_0_20px_var(--accent-cyan-dim)]"
              onClick={generateCaptions}
              disabled={!topic.trim() || generating}
            >
              {generating ? (
                <><RefreshCw size={16} className="animate-spin" /> Generating Drafts...</>
              ) : (
                <><Sparkles size={16} /> Generate Options</>
              )}
            </button>
          </div>

          <div className="surface-glass p-0 overflow-hidden border border-border-accent shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]">
             <div className="bg-gradient-to-r from-bg-raised to-bg-surface p-5">
                <div className="mb-2 flex items-center gap-2 font-['Outfit'] text-[15px] font-bold text-text-contrast">
                   <Zap size={16} className="text-accent-cyan" /> Algorithm Context
                </div>
                <p className="text-[13px] leading-relaxed text-(--text-secondary) font-medium font-['Inter']">
                   AI analyzes the exact formatting rules for <strong className="text-text-contrast">{niche}</strong>, injecting curiosity gaps naturally.
                </p>
             </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div>
          {!generating && !results && (
            <div className="surface-glass flex h-full min-h-[500px] flex-col items-center justify-center p-12 text-center opacity-80">
              <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-bg-raised border border-border-strong shadow-inner">
                <FileText size={32} className="text-(--text-tertiary)" />
              </div>
              <h3 className="mb-2 font-['Outfit'] text-[20px] font-bold text-text-contrast">No drafts yet</h3>
              <p className="text-[14px] text-(--text-secondary) max-w-sm">
                Fill out the context engine on the left, and AI will generate 3 highly optimized caption options.
              </p>
            </div>
          )}

          {generating && (
            <div className="surface-glass flex h-full min-h-[500px] flex-col items-center justify-center p-12 text-center">
              <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-bg-raised"></div>
                <div className="absolute inset-0 rounded-full border-t border-r border-accent-cyan animate-spin" style={{ animationDuration: "0.8s" }}></div>
                <div className="absolute inset-2 rounded-full border-b border-l border-accent-purple animate-spin" style={{ animationDuration: "1.2s", animationDirection: "reverse" }}></div>
                <FileText size={28} className="text-(--text-secondary) animate-pulse" />
              </div>
              <div className="mb-2 font-['Outfit'] text-[20px] font-bold text-text-contrast">Writing Drafts...</div>
              <div className="flex flex-col gap-2 text-[13px] text-(--text-secondary) mt-4">
                <span className="flex items-center justify-center gap-2"><CheckCircle2 size={12} className="text-green" /> Injecting keywords</span>
                <span className="flex items-center justify-center gap-2"><CheckCircle2 size={12} className="text-green" /> Formatting line breaks</span>
                <span className="flex items-center justify-center gap-2 animate-pulse"><Zap size={12} className="text-accent-cyan" /> Optimising hook</span>
              </div>
            </div>
          )}

          {results && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {results?.map((result: CaptionResult, index: number) => (
                <div key={result.id} className="surface-glass p-0 overflow-hidden border border-border-subtle transition-all hover:border-border-strong hover:shadow-xl group">
                  <div className="flex items-center justify-between border-b border-border-subtle bg-bg-raised px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-bg-surface border border-border-subtle text-[12px] font-black italic text-text-contrast shadow-inner">
                        {index + 1}
                      </span>
                      <h3 className="font-['Outfit'] text-[16px] font-bold text-text-contrast">
                        {result.style}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 rounded bg-accent-cyan/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-cyan border border-accent-cyan/20">
                      <Sparkles size={12} /> Score: {result.score}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 whitespace-pre-wrap text-[14px] leading-loose text-text-contrast font-medium font-['Inter']">
                      {result.text}
                    </div>
                    <div className="mb-6 mt-4">
                      <p className="text-[13px] font-medium text-accent-cyan opacity-90 underline underline-offset-2 decoration-accent-cyan/30">
                        {result.hashtags}
                      </p>
                    </div>

                     <button
                        onClick={() => handleCopy(`${result.text}\n\n${result.hashtags}`, result.id)}
                        className={`flex w-full items-center justify-center gap-2 rounded-lg border h-[42px] text-[13px] font-semibold transition-all ${
                          copied === result.id
                            ? "border-green/30 bg-green/10 text-green shadow-inner"
                            : "border-border-strong bg-bg-raised text-text-primary hover:bg-bg-overlay hover:border-border-accent hover:text-text-contrast"
                        }`}
                      >
                        {copied === result.id ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                        {copied === result.id ? "Copied" : "Copy Full Caption"}
                      </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
