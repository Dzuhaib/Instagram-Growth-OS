import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instagram Growth OS — Engine your viral reach",
  description:
    "Engineering viral Instagram growth through data science. AI content scoring, niche tracking, and hook analysis for creators and agencies. Official Meta API, 100% Secure.",
  keywords: ["Instagram growth tool", "AI content strategy", "Instagram analytics", "viral hooks", "Meta Graph API", "organic reach intelligence"],
  authors: [{ name: "GrowthOS Team" }],
  creator: "GrowthOS",
  publisher: "GrowthOS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://growthos.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GrowthOS — The Intelligence Layer for Instagram Creators",
    description: "Data-driven growth intelligence to help you engineer viral reach and outpace your niche competitors.",
    url: "https://growthos.app",
    siteName: "GrowthOS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowthOS — Engineering Instagram Viral Growth",
    description: "Stop guessing your content strategy. Use AI to score your hooks and predict your reach.",
    creator: "@growthos",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "GrowthOS",
  "operatingSystem": "Web",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1240"
  },
  "description": "AI-powered Instagram growth intelligence platform for creators and agencies."
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
