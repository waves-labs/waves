import { defineConfig } from "vite";

import svgr from "vite-plugin-svgr";
import mkcert from "vite-plugin-mkcert";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  /**
   * Defines global constant replacments
   * @see https://vitejs.dev/config/shared-options.html#define
   */
  define: {
    global: "globalThis",
  },
  resolve: {
    /**
     * Polyfills nodejs imports
     * @see https://vitejs.dev/config/shared-options.html#resolve-alias
     */
    alias: {
      process: "process/browser",
      util: "util",
    },
  },
  plugins: [
    react(),
    mkcert(),
    //@ts-ignore
    svgr({
      svgrOptions: {
        namedExport: "RC",
      },
    }),
    VitePWA({
      includeAssets: [
        "assets/logo-64.png",
        "assets/logo-310.png",
        "assets/waves.png",
        "assets/world.png",
        "assets/profile.png",
      ],
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "WAVES by Syn",
        short_name: "WAVES",
        icons: [
          {
            src: "assets/logo-64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "assets/logo-310.png",
            sizes: "192X192",
            type: "image/png",
          },
          {
            src: "assets/logo-310.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "fullscreen",
        theme_color: "#38bdf8",
        background_color: "#f0fdfa",
        shortcuts: [
          {
            name: "Synths",
            description: "View your synths and waves",
            url: "/synths",
            icons: [
              {
                src: "assets/waves.png",
                sizes: "64x64",
                type: "image/png",
              },
            ],
          },
          {
            name: "Explore",
            description: "Explore the World",
            url: "/world",
            icons: [
              {
                src: "assets/world.png",
                sizes: "64x64",
                type: "image/png",
              },
            ],
          },
          {
            name: "Profile",
            description: "View accomplishments and stats",
            url: "/profile",
            icons: [
              {
                src: "assets/profile.png",
                sizes: "64x64",
                type: "image/png",
              },
            ],
          },
        ],
      },
    }),
  ],
});
