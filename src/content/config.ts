import { defineCollection } from "astro:content";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({
    type: "content",  // 确保 docs 作为内容集合
    schema: docsSchema(),  // 使用 docsSchema() 来定义 schema
  }),
  i18n: defineCollection({
    type: "content", // 确保 i18n 作为内容集合
    schema: i18nSchema(),  // 使用 i18nSchema() 来定义 schema
  }),
};
