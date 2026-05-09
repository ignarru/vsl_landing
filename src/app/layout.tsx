import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IAbyIA",
  description:
    "Automatizá el 90% de tus consultas en WhatsApp con IA. Respondé al instante, vendé mientras dormís y recuperá tu inversión en 2-3 meses. Para negocios con +50 consultas diarias.",
  keywords: [
    "automatización whatsapp",
    "chatbot inteligente",
    "IA para negocios",
    "atención al cliente 24/7",
    "automatizar consultas",
    "IAbyIA",
  ],
  openGraph: {
    title: "IAbyIA Automations",
    description:
      "Dejá de perder ventas por no responder a tiempo. IA que atiende, filtra y vende las 24 horas.",
    type: "website",
    locale: "es_AR",
  },
  other: {
    "google-adsense-account": "ca-pub-3694403027462653",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Bricolage Grotesque via Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700;12..96,800&display=swap"
          rel="stylesheet"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3694403027462653"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H2DYQH0VWY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H2DYQH0VWY');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
