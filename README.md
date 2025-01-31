## 如何开始使用

安装 astro

```
npm create astro@latest
```

## 自定义样式

> 调整[「材料表格」](https://profabx-docs.vercel.app/prototype)的悬浮大小

找到 `src/components/Table.tsx` 文件，并修改 `Table` 组件的 `className` 属性，如下

```ts
<TableCardElement
  className="hover:scale-[1.5]"
  label={it.label}
  href={it.href}
  style={{ background: it.color }}
/>
```

调整 `scale-[1.5]`中的数字参数，比如改成 `scale-[2]` 即可

## 主题色调整

主题色是 HEX `#0054ff`，RGB `rgb(0, 84, 255)`

3 个地方处理了 profabX 的主题色；

1. 全局主题色，在 `tailwind.css`中 `--sl-color-accent`，主要是用来控制整个程序的主题色；

2. 组件主题色【需要编程】，在 `Layout.astro` 和 `tailwind.config.mjs`中，定义了 `accent` 作为主题色，用来调整 components 下的颜色；

具体配置

```css
accent-50: 237 247 255;
accent-100: 214 236 255;
accent-200: 181 223 255;
accent-300: 131 204 255;
accent-400: 72 175 255;
accent-500: 30 138 255;
accent-600: 6 105 255;
accent-700: 0 84 255;
accent-800: 8 65 197;
accent-900: 13 60 155;
accent-950: 14 37 93;

--pro-accent: var(accent-700);
--pro-accent-light: var(accent-500);
--pro-accent-dark: var(accent-800);
--pro-accent-1: var(accent-100);
--pro-accent-2: var(accent-200);
--pro-accent-3: var(accent-300);
--pro-accent-4: var(accent-400);
--pro-accent-5: var(accent-500);
--pro-accent-7: var(accent-600);
--pro-accent-8: var(accent-700);
--pro-accent-9: var(accent-800);
--pro-accent-10: var(accent-900);
```

如何使用 参考，`src/components/Card.astro`

```css
h2 {
  margin: 0;
  font-size: 1.25rem;
  color: rgba(var(--pro-accent));
}
```

3. 组件主题色-2【需要编程】，`tailwind.config.mjs` 中，定义了 `accent` 作为主题色，可以在 className 中通过 `accent-200` 等写法来使用，用于单独调整特的的样式；

如何使用：使用 tailwincss 写法，例如 `accent-700`，`border-accent-600`

```js
<a
  target="_blank"
  rel="noopener noreferrer"
  href={link}
  class="accent-700 inline-block px-2 py-4 rounded-lg h-32 w-64 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 no-underline border border-accent-700"
>
  {label}
</a>
```

## Logo 调整

在 `astro.config.mjs` 中找到 `logo` 参数，里面可以看到 `light` 和 `dark` 字段，分别对应亮色和暗色下 logo；

- 亮色 logo 的具体资源地址 `src/assets/light.png`
- 暗色 logo 的具体资源地址 `src/assets/dark.png`

## 多语言

- 在 `astro.config.mjs` 中找到 locales 参数，里面可以配置多语言，目前有 `en` 和 `zh-CN`，并且 `zh-CN` 是作为默认的语言来使用的

### 具体文档参考

- https://starlight.astro.build/guides/i18n/

## SEO 优化

### 文章

- [通过文章结构优化 SEO](https://starlight.astro.build/reference/frontmatter/#title-required)
- [使用 astro-seo 插件](https://github.com/jonasmerlin/astro-seo#readme)
- [配置通用的 layout](https://docs.astro.build/en/basics/layouts/#nesting-layouts)

### 视频

- [Youtube 视频参考](https://www.youtube.com/watch?v=fPifaHiKzz4)

## 配置侧边栏

### 增加路由信息的配置

在 `constants.ts` 增加路由信息，比如在 `PrototypeMenuItems` 下增加路由信息

```tsx
const PrototypeMenuItems = [
  ...{
    label: "示例",
    labelEn: "demo", // 用于侧边栏展示的翻译
    translations: {
      en: "demo", // 用于标题的翻译
    },
    collapsed: true, // 处理分组折叠，当为 true 时，默认为折叠状态
    items: [
      {
        label: "硬度",
        link: "/demo/1",
        linkEn: "/en/demo/2",
        labelEn: "demo-1",
        translations: {
          en: "demo-1",
        },
        attrs: { id: "demo" }, // 需要设置路由的对应 id，这样才能在访问文章时候展示正确的侧边栏
      },
    ],
  },
];
```

#### 增加相应 id 和路由地址的文章

在 `content/docs/demo/1.mdx` 中增加对应的 id，如下

```mdx
---
title: Control
sidebar:
  attrs: { id: demo }
---

具体的文章内容
```

#### 如何折叠分组

- [官方文档](https://starlight.astro.build/zh-cn/guides/sidebar/#%E6%8A%98%E5%8F%A0%E5%88%86%E7%BB%84)

在有 items 的路由中吗，增加一个 `collapsed: true` 即可

```tsx
const PrototypeMenuItems = [
  ...{
    label: "示例",
    labelEn: "demo", // 用于侧边栏展示的翻译
    translations: {
      en: "demo", // 用于标题的翻译
    },
    collapsed: true, // 处理分组折叠，当为 true 时，默认为折叠状态
    items: [
      {
        label: "硬度",
        link: "/demo/1",
        linkEn: "/en/demo/2",
        labelEn: "demo-1",
        translations: {
          en: "demo-1",
        },
        attrs: { id: "demo" }, // 需要设置路由的对应 id，这样才能在访问文章时候展示正确的侧边栏
      },
    ],
  },
];
```
## 其他(other)