import { defineConfig } from "vite";
import dns from "dns";
import react from "@vitejs/plugin-react";

// localhost part
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
