import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: path.resolve("src/app"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    root: __dirname,
    setupFiles: ["./vitest.setup.ts"],
  },
});
