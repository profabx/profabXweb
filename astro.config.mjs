import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { SideBarData } from "./src/constants";

export default defineConfig({
  site: "https://profabx.com",
  integrations: [
    starlight({
      title: "ProFabX",
      tableOfContents: false,
      logo: {
        light: "./src/assets/dark.png",
        dark: "./src/assets/light.png",
      },
      defaultLocale: "root", // NOTE 这个是多语言的默认配置。不能修改
      locales: {
        en: {
          label: "English",
          lang: 'en'
        },
        root: { // NOTE root 为默认语言设置，不能修改
          label: "简体中文",
          lang: "zh-CN", // lang is required for root locales
        },
      },
      customCss: [
        "./src/tailwind.css",
      ],
      sidebar: SideBarData,
      components: {
        SiteTitle: "./src/components/SiteTitle.astro",
        SocialIcons: "./src/components/NavBarLink.astro",
        Sidebar: "./src/components/Sidebar.astro",
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
