import Image from "next/image";

type IconName =
  | "arrow-right"
  | "arrow-left"
  | "arrow-down"
  | "arrow-up"
  | "mail"
  | "phone"
  | "heart"
  | "star"
  | "external";

const sizes: Record<IconName, { w: number; h: number }> = {
  "arrow-right": { w: 14, h: 9 },
  "arrow-left": { w: 14, h: 9 },
  "arrow-down": { w: 20, h: 20 },
  "arrow-up": { w: 16, h: 10 },
  mail: { w: 14, h: 12 },
  phone: { w: 13, h: 13 },
  heart: { w: 14, h: 13 },
  star: { w: 13, h: 13 },
  external: { w: 11, h: 11 },
};

type IconProps = {
  name: IconName;
  white?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function Icon({
  name,
  white = false,
  className,
  style,
}: IconProps) {
  const { w, h } = sizes[name];
  return (
    <Image
      src={`/icons/${name}.svg`}
      alt=""
      width={w}
      quality={90}
      height={h}
      aria-hidden
      className={className}
      style={{
        display: "block",
        ...(white && { filter: "brightness(0) invert(1)" }),
        ...style,
      }}
    />
  );
}
