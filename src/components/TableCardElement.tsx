import { twMerge } from "tailwind-merge";

type Props = {
  href: string;
  label: string;
  style: Record<string, any>;
  className?: string;
};

type ItemType = {
  title: string;
  color: string;
  left: { label: string; color: string; href: string }[];
  right: { label: string; color: string; href: string }[];
};

// 左侧
const LeftSide = ({ item }: { item: ItemType }) => (
  <div className="flex flex-row flex-wrap justify-end gap-4 items-center">
    {item.left.map((it, index) => (
      <TableCardElement
        key={it.label + index}
        className="hover:scale-[1.5]"
        label={it.label}
        href={it.href}
        style={{ background: it.color }}
      />
    ))}
  </div>
);

// 右侧
const RightSide = ({ item }: { item: ItemType }) => (
  <div className="flex flex-row flex-wrap gap-4 items-center">
    {item.right.map((it, index) => (
      <TableCardElement
        key={it.label + index}
        className="hover:scale-[1.5]"
        label={it.label}
        href={it.href}
        style={{ background: it.color }}
      />
    ))}
  </div>
);

// 中间
const CenterSide = ({
  className,
  item,
}: {
  className?: string;
  item: ItemType;
}) => (
  <div
    className={twMerge(
      "flex justify-center items-center h-full w-full rounded-lg border transition ease-in-out hover:-translate-y-1 duration-300 hover:scale-[1.5]",
      className
    )}
    style={{
      background: item.color,
    }}
  >
    <span className="text-black text-center">{item.title}</span>
  </div>
);

function TableCardElement({ className, href, label, style }: Props) {
  return (
    <div
      className={twMerge(
        "flex justify-center items-center w-16 h-16 rounded-lg transition ease-in-out hover:-translate-y-1 duration-300 group",
        // `hover:scale-[${+scale}]`,
        className
      )}
      style={{ ...style }}
    >
      <a
        href={href}
        className="text-white no-underline group-hover:underline cursor-pointer"
      >
        {label}
      </a>
    </div>
  );
}

export { TableCardElement, LeftSide, RightSide, CenterSide };
