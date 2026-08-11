import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import Tracker from "@/components/tracker";
import { CTA_BOOT } from "@/lib/cta-boot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IAbyIA — Auditoría de operaciones con IA",
  description:
    "Te hago el mapa de cómo funciona tu negocio por dentro, cuánto te cuesta cada proceso en horas y en plata, y qué conviene automatizar primero. Después lo implemento. Para PyMEs de 5 a 50 personas.",
  keywords: [
    "auditoría de procesos",
    "automatización de procesos con IA",
    "operaciones con inteligencia artificial",
    "IA para PyMEs",
    "automatizar tareas repetitivas",
    "IAbyIA",
  ],
  openGraph: {
    title: "IAbyIA — Auditoría de operaciones con IA",
    description:
      "El problema no es que no le contestes. Es todo lo que pasa después. Te muestro dónde tu negocio pierde plata y horas, y cuánto vale cada agujero.",
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
        {/* Archivo (display condensada, eje de ancho) + Martian Mono (rotulación técnica).
            Las dos son variables: el CSS ajusta el ancho con font-variation-settings. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Martian+Mono:wdth,wght@75..112.5,300..700&display=swap"
          rel="stylesheet"
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
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        {/* Tracking propio → dashboard.iabyia.com.ar. Es el único que puede unir una visita con
            la reunión y la venta que generó; GA4 (arriba) queda para el tráfico general. */}
        <Tracker />
      </body>
    </html>
  );
}
