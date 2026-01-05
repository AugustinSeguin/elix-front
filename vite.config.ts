import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Charge les variables d'env (.env) pour que le proxy les voit en dev
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
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