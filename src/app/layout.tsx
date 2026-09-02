import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import Script from "next/script";
import Tracker from "@/components/tracker";
import { CTA_BOOT } from "@/lib/cta-boot";
import { FAQS } from "@/lib/faqs";
import "./globals.css";

/* Las dos fuentes de marca, self-hosted por next/font: sin la cadena
   googleapis → gstatic que en móvil corría el LCP a más de 5 s. Archivo trae el eje
   de ancho (`wdth`): el CSS la usa condensada en titulares y normal en el cuerpo. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

const martian = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
  axes: ["wdth"],
});

const SITE = "https://iabyia.com.ar";
const TITULO = "IAbyIA — Auditoría de operaciones con IA";
const DESCRIPCION =
  "Te hago el mapa de cómo funciona tu negocio por dentro, cuánto te cuesta cada proceso en horas y en plata, y qué conviene automatizar primero. Después lo implemento. Para PyMEs de 3 a 50 personas, 100 % remoto.";
const DESCRIPCION_SOCIAL =
  "Tu negocio pierde plata en tareas que se hacen a mano, y todavía no sabés cuánta. Te muestro dónde, cuánto vale cada agujero y qué automatizar primero.";

const REDES = [
  "https://www.youtube.com/@ignacio.arruvito",
  "https://www.instagram.com/ignacioarruvito",
  "https://www.tiktok.com/@ignacioarruvito11",
  "https://www.linkedin.com/in/ignacio-arruvito-485562340",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITULO,
  description: DESCRIPCION,
  keywords: [
    "auditoría de procesos",
    "automatización de procesos con IA",
    "operaciones con inteligencia artificial",
    "IA para PyMEs",
    "automatizar tareas repetitivas",
    "IAbyIA",
    "Ignacio Arruvito",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITULO,
    description: DESCRIPCION_SOCIAL,
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "IAbyIA",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "IAbyIA — Tu negocio pierde plata en tareas que se hacen a mano. Auditoría de operaciones con IA.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION_SOCIAL,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  other: {
    "google-adsense-account": "ca-pub-3694403027462653",
  },
};

export const viewport: Viewport = {
  themeColor: "#060b14",
  width: "device-width",
  initialScale: 1,
};

/* Datos estructurados: quién es el negocio, quién lo atiende y las preguntas frecuentes
   (rich result FAQPage). Todo sale de las mismas constantes que la página. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#negocio`,
      name: "IAbyIA",
      url: SITE,
      description: DESCRIPCION,
      email: "iabyia.business@gmail.com",
      founder: { "@id": `${SITE}/#ignacio` },
      areaServed: ["AR", "BO", "HN", "MX", "CO", "PE", "CL", "EC", "UY", "ES"],
      availableLanguage: "es",
      address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
      sameAs: REDES,
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#ignacio`,
      name: "Ignacio Arruvito",
      url: SITE,
      jobTitle: "Fundador",
      worksFor: { "@id": `${SITE}/#negocio` },
      sameAs: REDES,
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${archivo.variable} ${martian.variable}`}>
      <head>
        {/* ⚡ Primero de todo: completa los links a cal.com (utm + lp_sid) sin esperar a que
            hidrate React. El HTML estático los sirve pelados y un clic temprano perdía la
            atribución Y el puente con /landing. Ver lib/cta-boot.ts. */}
        <script dangerouslySetInnerHTML={{ __html: CTA_BOOT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
        />
        {/* Google Analytics 4 — diferido: no compite con el render del hero en móvil.
            El tracking que importa (visita → reunión → venta) es el propio, abajo. */}
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
      <body className="antialiased">
        <a href="#contenido" className="skip-link">Ir al contenido</a>
        {children}
        {/* Tracking propio → dashboard.iabyia.com.ar. Es el único que puede unir una visita con
            la reunión y la venta que generó; GA4 (arriba) queda para el tráfico general. */}
        <Tracker />
      </body>
    </html>
  );
}
