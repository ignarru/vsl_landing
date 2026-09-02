import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://iabyia.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-02");
  return [
    { url: `${BASE}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/privacidad`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terminos`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/eliminacion-datos`, lastModified, changeFrequency: "yearly", priority: 0.1 },
  ];
}
