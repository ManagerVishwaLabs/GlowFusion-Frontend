import { ICON_COLORS, ICON_SIZES } from "./icon.constants";

type IconSize = keyof typeof ICON_SIZES;
type IconColor = keyof typeof ICON_COLORS;

type IconProps = {
  size?: IconSize | number;
  color?: IconColor | string;
  className?: string;
};

export type { IconColor, IconProps, IconSize };
