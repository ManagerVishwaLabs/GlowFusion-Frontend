import type { IconProps } from "./types";
import { getIconColor, getIconSize } from "./icon.utils";

const ChevronDown = ({
  size = "md",
  color = "primary",
  className = "",
}: IconProps) => {
  const iconSize = getIconSize(size);
  const iconColor = getIconColor(color);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={iconColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide-chevron-down ${className}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};

export default ChevronDown;
