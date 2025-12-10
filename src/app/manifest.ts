import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chap-chat",
    short_name: "Chap-chat",
    description: "Empower your goal with with Chap-chat",
    start_url: "/(main)/(login)",
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
        src: "/CClogo.svg",
        sizes: "512x512",
        type: "image/svg",
      },
    ],
  };
}
