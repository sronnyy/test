import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  define: {
    global: {},
    "process.platform": JSON.stringify(process.platform),
  },
  plugins: [react()],
});
