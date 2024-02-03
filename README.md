## 自定义样式

> 调整[「材料表格」](https://profabx-docs.vercel.app/prototype)的悬浮大小

找到 `src/components/Table.tsx` 文件，并修改 `Table` 组件的 `className` 属性，如下
``` ts
   <TableCardElement
        className="hover:scale-[1.5]"
        label={it.label}
        href={it.href}
        style={{ background: it.color }}
    />
```
调整 `scale-[1.5]`中的数字参数，比如改成 `scale-[2]` 即可


### 主题色调整

TODO

### Logo 调整

TODO

