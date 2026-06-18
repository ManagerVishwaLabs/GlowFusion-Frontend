import { getIconColor, getIconSize } from "./icon.utils";
import type { IconProps } from "./types";

const CloseIcon = ({
  className = "",
  color = "primary",
  size = "sm",
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
      <line x1="18" x2="6" y1="6" y2="18" />

      <line x1="6" x2="18" y1="6" y2="18" />
    </svg>
  );
};

export default CloseIcon;
