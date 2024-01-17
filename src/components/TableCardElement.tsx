type Props = {
  href: string;
  label: string;
  style: any;
};

export default function TableCardElement({ href, label, style }: Props) {
  return (
    <div
      className="flex justify-center items-center w-16 h-16 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 group"
      style={style}
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
