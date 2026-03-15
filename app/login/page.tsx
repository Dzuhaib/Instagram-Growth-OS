"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <div
      className="dot-pattern"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background: "var(--bg-primary)",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px", textDecoration: "none" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles size={20} color="#0A0F1E" strokeWidth={2.5} />
        </div>
        <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "20px", color: "var(--text-primary)" }}>GrowthOS</span>
      </Link>

      <div className="glass-card" style={{ width: "100%", maxWidth: "440px", padding: "48px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "8px", fontFamily: "Outfit, sans-serif" }}>Welcome back</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "32px" }}>Sign in to your GrowthOS account</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "var(--text-secondary)" }}>Email</label>
            <input className="input-field" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "var(--text-secondary)" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input className="input-field" type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ paddingRight: "44px" }} />
              <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
          <a href="#" style={{ fontSize: "13px", color: "var(--accent)", textDecoration: "none" }}>Forgot password?</a>
        </div>

        <button
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center", marginBottom: "16px" }}
          onClick={() => router.push("/dashboard")}
        >
          Sign In <ArrowRight size={16} />
        </button>

        <p style={{ textAlign: "center", fontSize: "13px", color: "var(--text-muted)" }}>
          Don't have an account?{" "}
          <Link href="/onboarding" style={{ color: "var(--accent)", textDecoration: "none" }}>
            Start free trial
          </Link>
        </p>
      </div>
    </div>
  );
}
