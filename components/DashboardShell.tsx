"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Anchor,
  Calendar,
  Target,
  MessageSquare,
  BarChart3,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  LogOut,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/content-scorer", label: "Content Scorer", icon: Zap },
  { href: "/dashboard/hook-analyser", label: "Hook Analyser", icon: Anchor },
  { href: "/dashboard/schedule", label: "Post Schedule", icon: Calendar },
  { href: "/dashboard/niche-tracker", label: "Niche Tracker", icon: Target },
  { href: "/dashboard/caption-generator", label: "Caption Generator", icon: MessageSquare },
  { href: "/dashboard/competitor-gap", label: "Competitor Gap", icon: TrendingUp },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

const AGENCY_ITEMS = [
  { href: "/dashboard/agency", label: "Agency Hub", icon: Users },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [notifications] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setCollapsed(true);
      else setCollapsed(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-bg-base font-sans antialiased text-text-primary">
      {/* Sidebar */}
      <aside
        style={{ width: collapsed ? "72px" : "240px" }}
        className="fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border-subtle bg-bg-surface transition-[width] duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.6)]"
      >
        {/* Logo */}
        <Link 
          href="/"
          className={`group flex min-h-[72px] items-center border-b border-border-subtle cursor-pointer ${collapsed ? "justify-center px-4" : "px-6 gap-3"}`}
        >
          <div className="w-6 h-6 rounded-full bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] flex shrink-0 items-center justify-center transition-transform duration-500 group-hover:rotate-180 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
          </div>
          {!collapsed && (
            <div className="font-heading text-[16px] font-bold tracking-tight text-gradient-instagram pt-0.5">
              GrowthOS
            </div>
          )}
        </Link>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <div className="mb-4">
            {!collapsed && (
              <div className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
                Main Menu
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`group flex items-center rounded-xl px-3 py-2.5 transition-all duration-300 ${
                      isActive 
                        ? "bg-accent-pink/10 text-accent-pink" 
                        : "text-text-secondary hover:bg-accent-pink/5 hover:text-accent-pink"
                    } ${collapsed ? "justify-center" : "gap-3"}`}
                  >
                    <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} className={isActive ? "text-accent-pink" : "text-text-secondary group-hover:text-accent-pink transition-colors"} />
                    {!collapsed && <span className="text-[14px] font-medium">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-8 border-t border-border-subtle pt-6">
            {!collapsed && (
              <div className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
                Agency
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              {AGENCY_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`group flex items-center rounded-xl px-3 py-2.5 transition-all duration-300 ${
                      isActive 
                        ? "bg-accent-pink/10 text-accent-pink" 
                        : "text-text-secondary hover:bg-accent-pink/5 hover:text-accent-pink"
                    } ${collapsed ? "justify-center" : "gap-3"}`}
                  >
                    <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} className={isActive ? "text-accent-pink" : "text-text-secondary group-hover:text-accent-pink transition-colors"} />
                    {!collapsed && <span className="text-[14px] font-medium">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-border-subtle px-3 py-4 bg-bg-raised/50">
          <Link
            href="/dashboard/settings"
            title={collapsed ? "Settings" : undefined}
            className={`group flex items-center rounded-xl px-3 py-2.5 transition-all duration-300 ${
              pathname === "/dashboard/settings" 
                ? "bg-accent-pink/10 text-accent-pink" 
                : "text-text-secondary hover:bg-accent-pink/5 hover:text-accent-pink"
            } ${collapsed ? "justify-center" : "gap-3 mb-1.5"}`}
          >
            <Settings size={18} strokeWidth={pathname === "/dashboard/settings" ? 2 : 1.5} className={pathname === "/dashboard/settings" ? "text-accent-pink" : "text-text-secondary group-hover:text-accent-pink transition-colors"} />
            {!collapsed && <span className="text-[14px] font-medium">Settings</span>}
          </Link>
          <button
            title={collapsed ? "Sign Out" : undefined}
            className={`group flex w-full items-center rounded-xl px-3 py-2.5 transition-all duration-300 text-text-secondary hover:bg-red-500/10 hover:text-red-500 ${collapsed ? "justify-center" : "gap-3"}`}
          >
            <LogOut size={18} strokeWidth={1.5} className="text-text-secondary group-hover:text-red-500 transition-colors" />
            {!collapsed && <span className="text-[14px] font-medium">Sign Out</span>}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-24 flex h-6 w-6 items-center justify-center rounded-full border border-border-subtle bg-bg-surface text-text-tertiary shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-colors hover:text-text-contrast hover:border-border-strong z-50"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
        {/* The following code was part of the instruction but seems misplaced as it replaces the collapse toggle button.
            <Link href="/onboarding" className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] px-10 text-base font-bold text-white shadow-[0_8px_32px_-8px_rgba(225,48,108,0.5)] transition-all hover:scale-[1.03] hover:shadow-[0_12px_48px_-8px_rgba(225,48,108,0.7)] active:scale-[0.98]">
              <span className="relative z-10 flex items-center gap-2">
                Launch your engine <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
        */}
      </aside>

      {/* Main Content Area */}
      <div
        style={{ marginLeft: collapsed ? "72px" : "240px" }}
        className="flex min-h-screen w-full flex-col transition-[margin] duration-300 ease-in-out bg-bg-base"
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center justify-between border-b border-border-subtle bg-bg-base/80 px-8 backdrop-blur-xl">
          {/* Search */}
          <div className="flex w-72 items-center gap-2 rounded-xl border border-border-subtle bg-bg-raised px-4 py-2 shadow-inner transition-colors focus-within:border-border-accent focus-within:ring-1 focus-within:ring-border-accent">
            <Search size={16} className="text-text-tertiary" />
            <input
              placeholder="Search features or data..."
              className="w-full bg-transparent text-[14px] font-medium text-text-contrast placeholder-text-tertiary outline-none"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden rounded-full border border-accent-pink/30 bg-accent-pink/10 px-3 py-1 text-[11px] uppercase tracking-widest font-bold text-accent-pink sm:block">
              Pro Trial (5 days left)
            </div>

            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-bg-surface text-text-secondary transition-all hover:bg-bg-overlay hover:border-border-strong hover:text-text-contrast shadow-sm">
              <Bell size={18} strokeWidth={2} />
              {notifications > 0 && (
                 <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent-pink shadow-[0_0_10px_var(--color-accent-pink)] border-2 border-bg-surface"></span>
              )}
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] font-heading text-[15px] font-bold text-white border border-white/20 hover:scale-105 transition-transform shadow-[0_4px_10px_rgba(225,48,108,0.3)]">
              J
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 relative">
          <div className="absolute inset-0 z-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div className="mx-auto max-w-7xl relative z-10 animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
