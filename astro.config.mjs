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
        "./src/tailwind.css",
      ],
      // sidebar: [
      //   // A single link item labelled “Home”.
      //   { label: "Home", link: "/" },
      //   // A group labelled “Start Here” containing two links.
      //   {
      //     label: "Start Here",
      //     items: [
      //       { label: "Introduction", link: "/intro" },
      //       { label: "Next Steps", link: "/next-steps" },
      //     ],
      //   },
      //   // A group linking to all pages in the reference directory.
      //   {
      //     label: "Reference",
      //     autogenerate: { directory: "reference" },
      //   },
      // ],
      components: {
        // Override the default `SocialIcons` component.
        SocialIcons: "./src/components/NavBarLink.astro",
      },
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
    react(),
  ],
});
