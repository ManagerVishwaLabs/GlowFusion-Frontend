import { ICON_COLORS, ICON_SIZES } from "./icon.constants";

export type IconSize = keyof typeof ICON_SIZES;
export type IconColor = keyof typeof ICON_COLORS;

export type IconProps = {
  size?: IconSize | number;
  color?: IconColor | string;
  className?: string;
};
