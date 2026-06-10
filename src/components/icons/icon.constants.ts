const ICON_SIZE = 20;
const ICON_COLOR = "currentColor";
const ICON_SIZES = {
  lg: 24,
  md: 20,
  sm: 16,
  xl: 32,
  xs: 12,
} as const;

const ICON_COLORS = {
  danger: "#DC2626",
  disabled: "#9CA3AF",
  primary: "currentColor",
  secondary: "#6B7280",
  success: "#16A34A",
  warning: "#F59E0B",
} as const;

const DEFAULT_ICON_SIZE = ICON_SIZES.md;
const DEFAULT_ICON_COLOR = ICON_COLORS.primary;

export {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE,
  ICON_COLOR,
  ICON_COLORS,
  ICON_SIZE,
  ICON_SIZES,
};
