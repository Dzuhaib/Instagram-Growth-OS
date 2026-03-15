"use client";
import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  CreditCard,
  Bell,
  Instagram,
  Users,
  ShieldAlert,
  Save,
  Download,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  HelpCircle,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("billing");
  const [cancelModal, setCancelModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const TABS = [
    { id: "account", label: "Account", icon: User },
    { id: "billing", label: "Plan & Billing", icon: CreditCard },
    { id: "notifications", label: "Alerts", icon: Bell },
    { id: "connections", label: "Connections", icon: Instagram },
    { id: "team", label: "Team", icon: Users },
  ];

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-['Outfit'] text-3xl font-bold tracking-tight text-text-contrast mb-2 flex items-center gap-2">
          <SettingsIcon className="text-[var(--text-tertiary)]" size={28} /> Settings
        </h1>
        <p className="text-[15px] text-[var(--text-secondary)]">
          Manage your account, billing, and workspace preferences.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar Tabs */}
        <div className="flex flex-col gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left w-full transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[var(--bg-overlay)] text-text-contrast shadow-[inset_2px_0_0_var(--accent-cyan)] font-medium"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] hover:text-text-contrast"
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? "text-[var(--accent-cyan)]" : "text-[var(--text-tertiary)]"} />
              <span className="text-[14px]">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="surface-glass p-0">
          
          {/* === ACCOUNT TAB === */}
          {activeTab === "account" && (
            <div>
              <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-raised)] p-6">
                <h2 className="font-['Outfit'] text-[18px] font-bold text-text-contrast mb-1">Account details</h2>
                <p className="text-[13px] text-[var(--text-secondary)]">Update your personal information and email address.</p>
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="relative flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-cyan)] to-[#0077FF] font-['Outfit'] text-2xl font-bold text-bg-base border-2 border-[var(--border-strong)] transition-all hover:opacity-90">
                    J
                    <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--bg-raised)] border border-[var(--border-subtle)]">
                      <User size={12} className="text-[var(--text-primary)]" />
                    </div>
                  </div>
                  <div className="flex-1 w-full max-w-sm">
                    <button className="btn-secondary h-9 w-full">Upload New Avatar</button>
                    <p className="mt-2 text-[12px] text-[var(--text-tertiary)]">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="h-px bg-[var(--border-subtle)] w-full block"></div>

                <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[var(--text-secondary)]">First Name</label>
                    <input className="input-field" defaultValue="Jamie" />
                  </div>
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[var(--text-secondary)]">Last Name</label>
                    <input className="input-field" defaultValue="Smith" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-[13px] font-semibold text-[var(--text-secondary)]">Email Address</label>
                    <input className="input-field" defaultValue="jamie@example.com" type="email" />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button className="btn-accent h-10 px-6" onClick={handleSave}>
                    {saved ? <><CheckCircle2 size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="border-t border-[var(--border-subtle)] bg-[rgba(239,68,68,0.02)] p-6 md:p-8">
                <h3 className="flex items-center gap-2 font-['Outfit'] text-[16px] font-bold text-[var(--red)] mb-2">
                  <ShieldAlert size={18} /> Danger Zone
                </h3>
                <p className="mb-4 text-[13px] text-[var(--text-secondary)] max-w-2xl">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button className="flex h-9 items-center justify-center rounded-md border border-[var(--red-dim)] bg-[rgba(239,68,68,0.05)] px-4 text-[13px] font-semibold text-[var(--red)] transition-colors hover:bg-[var(--red)] hover:text-text-contrast">
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* === BILLING TAB === */}
          {activeTab === "billing" && (
            <div>
              <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-raised)] p-6">
                <h2 className="font-['Outfit'] text-[18px] font-bold text-text-contrast mb-1 flex items-center gap-2">
                  Plan & Billing
                </h2>
                <p className="text-[13px] text-[var(--text-secondary)]">Manage your subscription, view invoices, or cancel your plan.</p>
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-8">
                {/* Current Plan Card */}
                <div className="rounded-xl border border-[var(--border-accent)] bg-gradient-to-b from-[var(--bg-raised)] to-[var(--bg-surface)] p-6 shadow-[0_0_20px_var(--accent-cyan-dim)]">
                  <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-['Outfit'] text-2xl font-bold tracking-tight text-text-contrast">Growth Pro</span>
                        <span className="rounded-full bg-[var(--accent-cyan-dim)] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[var(--accent-cyan)] border border-[rgba(0,229,255,0.2)]">Active</span>
                      </div>
                      <p className="text-[13px] text-[var(--text-secondary)]">£49/month. Next billing date is Jun 1, 2026.</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="font-['Outfit'] text-[28px] font-bold text-text-contrast">£49<span className="text-[14px] font-medium text-[var(--text-tertiary)]">/mo</span></div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 mb-6 text-[13px] text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[var(--accent-cyan)]" /> Unlimited Content Scoring</div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[var(--accent-cyan)]" /> AI Caption Generation</div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[var(--accent-cyan)]" /> 3 Competitor Tracking</div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[var(--accent-cyan)]" /> Custom Hook Templates</div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[var(--border-subtle)]">
                    <button className="btn-accent h-10 w-full sm:w-auto">Upgrade to Agency (£99/mo)</button>
                    <button 
                      onClick={() => setCancelModal(true)} 
                      className="btn-secondary text-[var(--text-secondary)] hover:text-text-contrast hover:border-[var(--border-strong)] h-10 w-full sm:w-auto"
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </div>

                {/* Invoices */}
                <div>
                  <h3 className="mb-4 font-['Outfit'] text-[16px] font-bold text-text-contrast">Billing History</h3>
                  <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-raised)] overflow-hidden">
                    {[
                      { date: "May 1, 2026", amount: "£49.00", status: "Paid", id: "INV-2941" },
                      { date: "Apr 1, 2026", amount: "£49.00", status: "Paid", id: "INV-2849" },
                    ].map((inv, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-[var(--border-subtle)] p-4 last:border-0 hover:bg-[var(--bg-overlay)] transition-colors">
                        <div>
                          <div className="mb-1 text-[14px] font-semibold text-text-contrast">{inv.date}</div>
                          <div className="text-[12px] text-[var(--text-tertiary)]">{inv.id}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="mb-1 text-[14px] font-semibold text-text-contrast">{inv.amount}</div>
                            <div className="text-[12px] font-medium text-[var(--green)] flex items-center gap-1 justify-end">
                              <CheckCircle2 size={10} /> {inv.status}
                            </div>
                          </div>
                          <button className="text-[var(--text-secondary)] hover:text-text-contrast transition-colors p-2">
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs (Simplified for length) */}
          {["notifications", "connections", "team"].includes(activeTab) && (
            <div className="flex h-[400px] flex-col items-center justify-center p-12 text-center text-[var(--text-secondary)]">
              <LogOut size={32} className="mb-4 text-[var(--text-tertiary)]" />
              <p className="font-['Outfit'] text-[18px] font-bold text-text-contrast mb-2 tracking-tight">Tab Configuration</p>
              <p className="text-[14px]">This section shares the same layout pattern as Account.</p>
            </div>
          )}

        </div>
      </div>

      {/* Cancel Modal (2-Click Flow as explicitly requested previously) */}
      {cancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="surface-glass w-full max-w-md p-6 border-[var(--border-strong)] shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="mb-2 font-['Outfit'] text-[20px] font-bold text-text-contrast tracking-tight">Cancel Subscription</h2>
            <p className="mb-6 text-[14px] leading-relaxed text-[var(--text-secondary)]">
              Your cancellation takes effect at the end of your current billing cycle (Jun 1, 2026). You will retain access until then. No hidden fees.
            </p>
            <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
              <button
                className="btn-secondary h-10 w-full sm:w-auto"
                onClick={() => setCancelModal(false)}
              >
                Keep my plan
              </button>
              <button
                className="flex h-10 items-center justify-center rounded-md border border-[var(--red-dim)] bg-[var(--red)] px-6 text-[14px] font-bold text-text-contrast shadow-[0_4px_14px_rgba(239,68,68,0.4)] transition-transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
                onClick={() => setCancelModal(false)}
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
