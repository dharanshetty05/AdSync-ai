import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AdSync AI | Personalize Landing Pages with AI",
  description:
    "Align your landing page with ad intent instantly. AdSync AI analyzes your ad copy and rewrites key page content to improve conversion and message match.",

  keywords: [
    "AI landing page optimization",
    "ad to landing page alignment",
    "conversion rate optimization",
    "AI copywriting",
    "marketing AI tools",
  ],

  authors: [{ name: "Dharan Shetty" }],
  creator: "Dharan Shetty",

  openGraph: {
    title: "AdSync AI – AI-Powered Landing Page Personalization",
    description:
      "Instantly personalize landing pages based on ad intent. Improve conversions with AI-driven message alignment.",
    url: "https://your-deployment-url.vercel.app",
    siteName: "AdSync AI",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AdSync AI",
    description:
      "AI-powered landing page personalization based on ad intent.",
  },

  metadataBase: new URL("https://your-deployment-url.vercel.app"),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
