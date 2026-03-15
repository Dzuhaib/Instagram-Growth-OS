"use client";
import { useState } from "react";
import {
  FileText,
  Sparkles,
  Link as LinkIcon,
  Search,
  CheckCircle2,
  Copy,
  ChevronDown,
  RefreshCw,
  Zap,
} from "lucide-react";

const TONES = ["Educational", "Motivational", "Controversial", "Storytelling", "Humorous"];
const FORMATS = ["Reel", "Carousel", "Single Image"];

export default function CaptionGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Educational");
  const [format, setFormat] = useState("Reel");
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [showTones, setShowTones] = useState(false);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateCaptions = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setResults(null);
    setTimeout(() => {
      setGenerating(false);
      setResults([
        {
          id: 1,
          style: "Short & Punchy",
          text: "Stop overcomplicating your fat loss.\n\nYou don't need 6 meals a day. You don't need to cut out carbs.\n\nYou need a calorie deficit and patience.\n\nDrop a 🍕 if you agree.",
          hashtags: "#fatloss #nutritiontips #caloriedeficit #fitnessmyths",
          score: 92,
        },
        {
          id: 2,
          style: "Story Mode",
          text: "I used to track every single almond I ate.\n\nI was shredded, sure. But I was also miserable. I couldn't eat out with friends without panicking.\n\nIt took me 3 years to unlearn that behavior and find a sustainable balance.\n\nIf you're currently in that obsessive phase, just know there is a way out. My new guide covers how to transition to intuitive eating while maintaining your physique. Link in bio.",
          hashtags: "#intuitiveeating #fitnessjourney #dietculture",
          score: 88,
        },
        {
          id: 3,
          style: "Educational List",
          text: "3 reasons your metabolism feels 'broken':\n\n1. You're chronically under-eating.\n2. You've ignored resistance training.\n3. Your sleep quality is terrible.\n\nYour metabolism isn't broken. It's adapting to the signal you're sending it.\n\nSave this post to remind yourself when frustration hits.",
          hashtags: "#metabolism #fitnesseducation #sleepquality",
          score: 95,
        },
      ]);
    }, 3000);
  };

  return (
    <div className="pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2 flex items-center gap-2">
            <FileText className="text-[var(--accent-cyan)]" size={28} /> Caption Generator
          </h1>
          <p className="text-[15px] text-[var(--text-secondary)]">
            Create high-converting captions tailored to your niche and format.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
        {/* Left Column: Config */}
        <div className="flex flex-col gap-6">
          <div className="surface-glass p-6 md:p-8">
            <h2 className="mb-6 font-['Outfit'] text-[18px] font-bold text-text-contrast flex items-center gap-2">
              <Sparkles size={18} className="text-[var(--accent-cyan)]" /> Context Engine
            </h2>

            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[var(--text-secondary)]">What is the post about?</label>
              <textarea
                className="input-field min-h-[140px] bg-[var(--bg-raised)] font-medium font-['Inter'] leading-relaxed shadow-inner text-[14px]"
                placeholder="E.g. 3 stretches for lower back pain. Mention my free guide in the bio."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
               <div>
                  <label className="mb-3 block text-[13px] font-semibold text-[var(--text-secondary)]">Tone</label>
                  <div className="relative">
                     <button 
                        onClick={() => setShowTones(!showTones)}
                        className="flex h-11 w-full items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-raised)] px-4 text-[13px] font-semibold text-text-contrast transition-colors hover:border-[var(--accent-cyan)]"
                     >
                        {tone} <ChevronDown size={14} className="text-[var(--text-tertiary)]" />
                     </button>
                     {showTones && (
                        <div className="absolute top-[calc(100%+4px)] left-0 z-10 w-full overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-xl animate-in zoom-in-95 duration-150">
                           {TONES.map(t => (
                              <button 
                                 key={t}
                                 onClick={() => { setTone(t); setShowTones(false); }}
                                 className="w-full px-4 py-2.5 text-left text-[13px] font-medium text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] hover:text-text-contrast transition-colors"
                              >
                                 {t}
                              </button>
                           ))}
                        </div>
                     )}
                  </div>
               </div>

               <div>
                 <label className="mb-3 block text-[13px] font-semibold text-[var(--text-secondary)]">Format</label>
                 <select 
                    value={format} 
                    onChange={(e) => setFormat(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-raised)] px-4 text-[13px] font-semibold text-text-contrast transition-colors focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]"
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

          <div className="surface-glass p-0 overflow-hidden border border-[var(--border-accent)] shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]">
             <div className="bg-gradient-to-r from-[var(--bg-raised)] to-[var(--bg-surface)] p-5">
                <div className="mb-2 flex items-center gap-2 font-['Outfit'] text-[15px] font-bold text-text-contrast">
                   <Zap size={16} className="text-[var(--accent-cyan)]" /> Algorithm Context
                </div>
                <p className="text-[13px] leading-relaxed text-[var(--text-secondary)] font-medium font-['Inter']">
                   AI analyzes the exact formatting rules that lead to high DM share rates in your specific niche, injecting curiosity gaps naturally.
                </p>
             </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div>
          {!generating && !results && (
            <div className="surface-glass flex h-full min-h-[500px] flex-col items-center justify-center p-12 text-center opacity-80">
              <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-[var(--bg-raised)] border border-[var(--border-strong)] shadow-inner">
                <FileText size={32} className="text-[var(--text-tertiary)]" />
              </div>
              <h3 className="mb-2 font-['Outfit'] text-[20px] font-bold text-text-contrast">No drafts yet</h3>
              <p className="text-[14px] text-[var(--text-secondary)] max-w-sm">
                Fill out the context engine on the left, and AI will generate 3 highly optimized caption options.
              </p>
            </div>
          )}

          {generating && (
            <div className="surface-glass flex h-full min-h-[500px] flex-col items-center justify-center p-12 text-center">
              <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[var(--bg-raised)]"></div>
                <div className="absolute inset-0 rounded-full border-t border-r border-[var(--accent-cyan)] animate-spin" style={{ animationDuration: "0.8s" }}></div>
                <div className="absolute inset-2 rounded-full border-b border-l border-[var(--accent-violet)] animate-spin" style={{ animationDuration: "1.2s", animationDirection: "reverse" }}></div>
                <FileText size={28} className="text-[var(--text-secondary)] animate-pulse" />
              </div>
              <div className="mb-2 font-['Outfit'] text-[20px] font-bold text-text-contrast">Writing Drafts...</div>
              <div className="flex flex-col gap-2 text-[13px] text-[var(--text-secondary)] mt-4">
                <span className="flex items-center justify-center gap-2"><CheckCircle2 size={12} className="text-[var(--green)]" /> Injecting target keywords</span>
                <span className="flex items-center justify-center gap-2"><CheckCircle2 size={12} className="text-[var(--green)]" /> Formatting line breaks</span>
                <span className="flex items-center justify-center gap-2 animate-pulse"><Zap size={12} className="text-[var(--accent-cyan)]" /> Optimising hook retention</span>
              </div>
            </div>
          )}

          {results && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {results.map((result: any, index: number) => (
                <div key={result.id} className="surface-glass p-0 overflow-hidden border border-[var(--border-subtle)] transition-all hover:border-[var(--border-strong)] hover:shadow-xl group">
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-raised)] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[12px] font-black italic text-text-contrast shadow-inner">
                        {index + 1}
                      </span>
                      <h3 className="font-['Outfit'] text-[16px] font-bold text-text-contrast">
                        {result.style}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 rounded bg-[var(--accent-cyan-dim)] px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--accent-cyan)] border border-[rgba(0,229,255,0.2)]">
                      <Sparkles size={12} /> Score: {result.score}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 whitespace-pre-wrap text-[14px] leading-loose text-text-contrast font-medium font-['Inter']">
                      {result.text}
                    </div>
                    <div className="mb-6 mt-4">
                      <p className="text-[13px] font-medium text-[var(--accent-cyan)] opacity-90 underline underline-offset-2 decoration-[rgba(0,229,255,0.3)]">
                        {result.hashtags}
                      </p>
                    </div>

                     <button
                        onClick={() => handleCopy(`${result.text}\n\n${result.hashtags}`, result.id)}
                        className={`flex w-full items-center justify-center gap-2 rounded-lg border h-[42px] text-[13px] font-semibold transition-all ${
                          copied === result.id
                            ? "border-[rgba(16,185,129,0.3)] bg-[var(--green-dim)] text-[var(--green)] shadow-inner"
                            : "border-[var(--border-strong)] bg-[var(--bg-raised)] text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] hover:border-[var(--border-accent)] hover:text-text-contrast"
                        }`}
                      >
                        {copied === result.id ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                        {copied === result.id ? "Copied to Clipboard" : "Copy Full Caption"}
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
