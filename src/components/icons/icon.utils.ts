import {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE,
  ICON_COLORS,
  ICON_SIZES,
} from "./icon.constants";

import type { IconColor, IconSize } from "./types";

export const getIconSize = (size?: IconSize | number): number => {
  if (typeof size === "number") {
    return size;
  }

  return size ? ICON_SIZES[size] : DEFAULT_ICON_SIZE;
};

export const getIconColor = (color?: IconColor | string): string => {
  if (typeof color === "string" && !(color in ICON_COLORS)) {
    return color;
  }

  return color ? ICON_COLORS[color as IconColor] : DEFAULT_ICON_COLOR;
};
