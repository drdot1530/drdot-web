import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Single-page site: only real routes. Section anchors (#about, #services, #contact)
  // are not separate pages and should not appear as URLs here.
  return [
    {
      url: "https://drdotsolutions.com/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
