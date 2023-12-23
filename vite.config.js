import { defineConfig } from "vite";
import envCompatible from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [envCompatible()],
});
