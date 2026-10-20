import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sigiro Construction & General Supplies – Construction & Supplies | Nairobi, Kenya",
    template: "%s | Sigiro Construction & General Supplies",
  },
  description:
    "Sigiro Construction & General Supplies is a premier construction and engineering consultancy firm in Nairobi, Kenya. Specializing in roads, buildings, water works, landscaping, project management, and general supplies of goods.",
  keywords: [
    "construction company nairobi",
    "engineering consultancy kenya",
    "road construction kenya",
    "building construction nairobi",
    "water works kenya",
    "general supplies kenya",
    "Sigiro Construction",
    "Mohamednoor Adan",
    "Nairobi kenya",
  ],
  authors: [{ name: "Sigiro Construction & General Supplies" }],
  creator: "Sigiro Construction & General Supplies",
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "Sigiro Construction & General Supplies",
    title: "Sigiro Construction & General Supplies – Construction & Supplies | Nairobi, Kenya",
    description:
      "Premier construction and engineering consultancy firm in Nairobi, Kenya. Building Kenya's future one project at a time.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigiro Construction & General Supplies",
    description: "Premier construction and supplies firm in Nairobi, Kenya.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "256x256", type: "image/png" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <ClientWrapper>{children}</ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
