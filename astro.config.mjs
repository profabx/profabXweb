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
import { SideBarData } from "./src/constants";

// https://astro.build/config
export default defineConfig({
  site: "https://beta-profabx.github.io",
  integrations: [
    starlight({
      title: "ProFabX",
      tableOfContents: false,
      logo: {
        light: "./src/assets/dark.png",
        dark: "./src/assets/light.png",
      },
      defaultLocale: "root", // optional
      // defaultLocale: "en",

      locales: {
        // English docs in `src/content/docs/en/`
        en: {
          label: "English",
        },
        // Simplified Chinese docs in `src/content/docs/zh-cn/`
        // "zh-cn": {
        //   label: "简体中文",
        //   lang: "zh-CN",
        // },

        root: {
          label: "简体中文",
          lang: "zh-CN", // lang is required for root locales
        },

        // Arabic docs in `src/content/docs/ar/`
      },
      customCss: [
        // Relative path to your custom CSS file
        "./src/tailwind.css",
        // "./src/assets/landing.css",
      ],
      sidebar: SideBarData,
      components: {
        // Override the default `SocialIcons` component.
        // Hero: "./src/components/Hero.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
        SocialIcons: "./src/components/NavBarLink.astro",
        Sidebar: "./src/components/Sidebar.astro",
      },
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
    react(),
  ],
});
