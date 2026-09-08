import { Space_Grotesk, Hind_Siliguri, Baloo_Da_2 } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

// Truly global stuff only - fonts, analytics, the site-wide JSON-LD schema.
// Everything audience-specific (header, sidebar, footer, which Website
// Section the content comes from, page metadata) lives in the (main)
// route group's layout (Bangladesh, the site's default) and the
// international/ route's layout - see those for why.

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const balooDa2 = Baloo_Da_2({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo-da-2",
  display: "swap",
});

const siteURL = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.masterenglishbook.com";

// Ensures Next.js resolves relative metadata (og:image, etc.) against the
// production domain instead of the Vercel deployment URL.
export const metadata = {
  metadataBase: new URL("https://masterenglishbook.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7889299981957538"
          crossOrigin="anonymous"
        ></Script>
      </head>
      <body
        className={`${hindSiliguri.variable} ${balooDa2.variable} ${spaceGrotesk.variable} font-hind bg-slate-50`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Master English Book",
                "url": siteURL,
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": { "@type": "EntryPoint", "urlTemplate": `${siteURL}/book/{search_term_string}` },
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Red Rose Corporation",
                "url": "https://corporation.redrosebd.com",
                "logo": `${siteURL}/image/logoDark.png`,
                "sameAs": ["https://www.masterenglishbook.com"],
              },
            ]),
          }}
        />
        {children}
        <GoogleAnalytics gaId="G-YM9TZWWD6D" />
      </body>
    </html>
  );
}
