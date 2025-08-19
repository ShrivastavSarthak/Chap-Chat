import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oneorg",
    short_name: "Oneorg",
    description: "A Progressive Web App built with Oneorg",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon2.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon1.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
