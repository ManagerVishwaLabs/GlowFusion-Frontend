import type { IconProps } from "./types";
import { getIconColor, getIconSize } from "./icon.utils";

const PanelLeftIcon = ({
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
    </svg>
  );
};

export default PanelLeftIcon;
