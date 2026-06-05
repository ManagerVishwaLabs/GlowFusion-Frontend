import type { IconProps } from "./types";
import { getIconColor, getIconSize } from "./icon.utils";

const ChevronLeft = ({
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
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className={`lucide-chevron-left ${className}`}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};

export default ChevronLeft;
