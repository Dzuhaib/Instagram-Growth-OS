import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GrowthOS — Instagram Growth Intelligence",
  description:
    "Stop buying followers. Start earning reach. AI-powered content intelligence for Instagram creators and agencies. Official Meta API, no password required.",
  keywords: "Instagram growth, content strategy, AI analytics, Meta API, organic reach",
  openGraph: {
    title: "GrowthOS — Instagram Growth Intelligence",
    description: "AI-powered content intelligence for Instagram creators and agencies.",
    type: "website",
    url: "https://growthos.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowthOS — Instagram Growth Intelligence",
    description: "Stop buying followers. Start earning reach.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
