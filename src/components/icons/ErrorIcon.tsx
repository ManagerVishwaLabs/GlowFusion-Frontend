import { getIconColor, getIconSize } from "./icon.utils";
import type { IconProps } from "./types";

const ErrorIcon = ({
  className = "",
  color = "danger",
  size = "md",
}: IconProps) => {
  const iconSize = getIconSize(size);

  const iconColor = getIconColor(color);

  return (
    <svg
      className={className}
      fill="none"
      height={iconSize}
      stroke={iconColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={iconSize}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" />

      <line x1="12" x2="12" y1="8" y2="13" />

      <circle cx="12" cy="17" fill={iconColor} r="1" />
    </svg>
  );
};

export default ErrorIcon;
