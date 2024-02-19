import { twMerge } from "tailwind-merge";

type Props = {
  href: string;
  label: string;
  style: Record<string, any>;
  className?: string;
};

export default function TableCardElement({
  className,
  href,
  label,
  style,
}: Props) {
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
