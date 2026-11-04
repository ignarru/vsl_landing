import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import Tracker from "@/components/tracker";
import { CTA_BOOT } from "@/lib/cta-boot";
import "./globals.css";

/* v4 (nov 2026): estética oscura y simple. Fuentes self-hosted por next/font: sin la hoja de
   Google Fonts bloqueando el render (en v2 el LCP en celular era de 6,3 s). */
const titulos = Space_Grotesk({ variable: "--font-titulos", subsets: ["latin"], weight: ["500", "700"], display: "swap" });
const cuerpo = DM_Sans({ variable: "--font-cuerpo", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "IAbyIA — IA para vender más en tu negocio online",
  description:
    "Vendé más con la misma pauta y el mismo equipo. Metemos IA en tu marketing, tus ventas y tu operación, empezando por donde más plata perdés.",
  keywords: [
    "consultoría de IA",
    "IA para e-commerce",
    "automatización con IA",
    "agentes de IA para ventas",
    "IA para negocios online",
    "IAbyIA",
  ],
  openGraph: {
    title: "IAbyIA — IA para vender más en tu negocio online",
    description:
      "Vendé más con la misma pauta y el mismo equipo. Metemos IA en tu marketing, tus ventas y tu operación.",
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
        {/* ⚡ Primero de todo: completa los links a cal.com (utm + lp_sid) sin esperar a que
            hidrate React. El HTML estático los sirve pelados y un clic temprano perdía la
            atribución Y el puente con /landing. Ver lib/cta-boot.ts. */}
        <script dangerouslySetInnerHTML={{ __html: CTA_BOOT }} />
        {/* Google Analytics 4 — lazyOnload: en v2 se llevaba ~0,5 s del hilo principal en celular
            antes de que la página fuera usable. El tracking propio (Tracker) no depende de GA. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H2DYQH0VWY"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H2DYQH0VWY');
          `}
        </Script>
      </head>
      <body className={`${titulos.variable} ${cuerpo.variable} antialiased`}>
        {children}
        {/* Tracking propio → dashboard.iabyia.com.ar. Es el único que puede unir una visita con
            la reunión y la venta que generó; GA4 (arriba) queda para el tráfico general. */}
        <Tracker />
      </body>
    </html>
  );
}
