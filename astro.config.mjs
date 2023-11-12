/*
 * @Describle:
 * @Author: Stan <stan4cy@gmail.com>
 * @Date: 2023-11-03 02:13:43
 * @LastEditors: Stan
 * @LastEditTime: 2023-11-05 14:40:30
 */
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "ProFabX",
      logo: {
        src: "./src/assets/logo.svg",
      },
      defaultLocale: "en",
      locales: {
        // English docs in `src/content/docs/en/`
        en: {
          label: "English",
        },
        // Simplified Chinese docs in `src/content/docs/zh-cn/`
        "zh-cn": {
          label: "简体中文",
          lang: "zh-CN",
        },

        // Arabic docs in `src/content/docs/ar/`
      },
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
      ],
    }),
    tailwind(),
    react(),
  ],
});
