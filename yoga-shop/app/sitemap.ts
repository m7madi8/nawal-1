import { MetadataRoute } from "next";
import { getAllProductSlugs } from "@/lib/products";

const BASE_URL = "https://nawalyoga.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const productRoutes = getAllProductSlugs().map((slug) => ({
    url: `${BASE_URL}/shop/product/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...productRoutes,
  ];
}
