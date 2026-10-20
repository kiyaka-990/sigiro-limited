import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sigiro Construction & General Supplies",
    short_name: "Sigiro",
    description:
      "Construction, engineering consultancy and general supplies of goods — roads, buildings, water works, landscaping and project management in Nairobi, Kenya.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#ffffff",
    theme_color: "#047c3e",
    lang: "en-KE",
    categories: ["business", "productivity", "shopping"],
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512x512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      { src: "/favicon.png", sizes: "256x256", type: "image/png" },
    ],
  };
}
