import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  // Charge les variables d'env (.env) pour que le proxy les voit en dev
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
          type: "module",
        },
        workbox: {
          globPatterns:
            mode === "production"
              ? ["**/*.{js,css,html,ico,png,svg,json,txt}"]
              : [],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.elix\.cleanascode\.fr\/.*/i,
              handler: "NetworkFirst",
              options: {
                cacheName: "api-cache",
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24, // 24 heures
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        includeAssets: ["logo.svg"],
        manifest: {
          name: "Elix",
          short_name: "Elix",
          description: "Elix - application d'education a la sante sexuelle",
          theme_color: "#9a3d80",
          background_color: "#f0f9ff",
          display: "standalone",
          orientation: "portrait",
          start_url: "/",
          scope: "/",
          icons: [
            {
              src: "/logo.svg",
              sizes: "any",
              type: "image/svg+xml",
              purpose: "any maskable",
            },
            {
              src: "/logo.svg",
              sizes: "512x512",
              type: "image/svg+xml",
              purpose: "any",
            },
            {
              src: "/logo.svg",
              sizes: "192x192",
              type: "image/svg+xml",
              purpose: "any",
            },
          ],
        },
      }),
    ],
    define: {
      __APP_VERSION__: JSON.stringify("1.0.0"),
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:5059",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
