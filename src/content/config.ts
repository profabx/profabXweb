/*
 * @Describle:
 * @Author: Stan <stan4cy@gmail.com>
 * @Date: 2023-11-05 14:43:08
 * @LastEditors: Stan
 * @LastEditTime: 2023-11-05 14:43:15
 */
import { defineCollection, z } from "astro:content"; // ✅ 添加 `z` 导入
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  i18n: defineCollection({ 
    type: "content", // 确保是内容集合 (content collection)
    schema: z.object({  // ✅ 这里的 `z` 需要导入，否则报错
      title: z.string(),
      description: z.string().optional(),
      date: z.string().optional(),
      author: z.string().optional(),
    }),
  }),
};
