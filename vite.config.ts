// vite.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.{js,ts,jsx,tsx}"],
    setupFiles: "./src/setupTests.ts",
  }
});
