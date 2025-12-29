import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";

// Get git tag
let version = "1.0.0";
try {
  version = execSync("git describe --tags --abbrev=0").toString().trim();
} catch {
  console.log("No git tag found, defaulting to 1.0.0");
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL_OFFICIAL || "http://localhost:5059",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
    },
  },
});
