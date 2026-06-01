import { defineCollection, reference } from "astro:content";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

const docs = defineCollection({
  schema: docsSchema(),
  loader: {
    // Load all .md and .mdx files in the docs directory
    include: ["**/*.md", "**/*.mdx"],
  },
});

const i18n = defineCollection({
  schema: i18nSchema(),
  loader: {
    // Load all .md files in the i18n directory
    include: ["**/*.md"],
  },
});

export const collections = { docs, i18n };