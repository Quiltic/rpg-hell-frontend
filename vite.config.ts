/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { searchIndexPlugin } from "./src/search/vitePlugin";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/rpg-hell-frontend",
    plugins: [react(), searchIndexPlugin()],
    appType: "spa",
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/test/setup.ts"],
        include: ["src/**/*.{test,spec}.{ts,tsx}"],
    },
});
