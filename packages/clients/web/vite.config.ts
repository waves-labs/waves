/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from "vite";

import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import { VitePWA } from "vite-plugin-pwa";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    mkcert(),
    svgr({
      svgrOptions: {
        namedExport: "RC",
      },
    }),
    VitePWA({
      includeAssets: [
        "icons/favicon.ico",
        "icons/logo.svg",
        "icons/logo-64.png",
        "icons/logo-310.png",
        "icons/banner-logo.png",
        "icons/house.png",
        "icons/market.png",
        "icons/profile.png",
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
        name: "Waves House",
        short_name: "Waves House",
        icons: [
          {
            src: "icons/logo-64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "icons/logo-310.png",
            sizes: "192X192",
            type: "image/png",
          },
          {
            src: "icons/logo-310.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        scope: "/",
        display: "fullscreen",
        orientation: "portrait-primary",
        theme_color: "#e9e3dd",
        background_color: "#191c1c",
        shortcuts: [
          {
            name: "House",
            description: "Check what's happening in your house",
            url: "/house",
            icons: [
              {
                src: "icons/house.png",
                sizes: "64x64",
                type: "image/png",
              },
            ],
          },
          {
            name: "Market",
            description: "Cop some new art, apparel, and more",
            url: "/market",
            icons: [
              {
                src: "icons/market.png",
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
                src: "icons/profile.png",
                sizes: "64x64",
                type: "image/png",
              },
            ],
          },
        ],
        related_applications: [
          {
            platform: "webapp",
            url: "https://localhost:5173/manifest.webmanifest",
          },
        ],
        categories: ["entertainment", "music", "social"],
      },
    }),
    nodePolyfills({
      // To exclude specific polyfills, add them to this list.
      exclude: [
        "fs", // Excludes the polyfill for `fs` and `node:fs`.
      ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  server: {
    port: 3005,
  },
});
