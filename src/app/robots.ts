import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/* Cloudflare le antepone a este archivo su robots.txt gestionado (content signals y
   bloqueo de crawlers de IA). Lo que se decide acá es lo de siempre: indexable + sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://iabyia.com.ar/sitemap.xml",
  };
}
