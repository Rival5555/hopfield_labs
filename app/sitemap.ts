import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hopfieldlabs.com";

  const routes = [
    "",
    "/services",
    "/services/web-development",
    "/services/mobile-development",
    "/services/genai-integration",
    "/services/aiml-solutions",
    "/services/fyp-mentoring",
    "/work",
    "/about",
    "/contact",
    "/start",
    "/styleguide",
    "/privacy",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
