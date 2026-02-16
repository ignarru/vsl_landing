import type { Metadata } from "next";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
