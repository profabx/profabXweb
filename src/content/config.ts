/*
 * @Describle:
 * @Author: Stan <stan4cy@gmail.com>
 * @Date: 2023-11-05 14:43:08
 * @LastEditors: Stan
 * @LastEditTime: 2023-11-05 14:43:15
 */
import { defineCollection } from "astro:content";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  i18n: defineCollection({ 
    type: "content", // 确保是内容集合 (content collection)
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.string().optional(),
      author: z.string().optional(),
   }),
   }),
};
