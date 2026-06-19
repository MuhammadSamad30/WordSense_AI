import type { Metadata } from "next";
import { Poppins, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const notoUrdu = Noto_Nastaliq_Urdu({
  weight: ["400"],
  subsets: ["arabic"],
  variable: "--font-noto-urdu",
});

export const metadata: Metadata = {
  title: "WordSense AI - Premium English-to-Urdu Dictionary",
  description: "Experience the power of AI with WordSense. Search English words, get Urdu meanings, examples, and instant Text-to-Speech.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wordsense-ai.vercel.app'),
  openGraph: {
    title: "WordSense AI - Premium English-to-Urdu Dictionary",
    description: "Experience the power of AI with WordSense. Search English words, get Urdu meanings, examples, and instant Text-to-Speech.",
    url: 'https://wordsense-ai.vercel.app',
    siteName: 'WordSense AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordSense AI - Premium English-to-Urdu Dictionary',
    description: 'Experience the power of AI with WordSense. Search English words, get Urdu meanings, examples, and instant Text-to-Speech.',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for dictionary search box
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "WordSense AI",
    "url": "https://wordsense-ai.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://wordsense-ai.vercel.app/?word={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${notoUrdu.variable} h-full antialiased`}
    >
      <head>
        {/* Structured Data script injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-poppins min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
