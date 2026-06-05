import type { IconProps } from "./types";
import { getIconColor, getIconSize } from "./icon.utils";

const AppleIcon = ({
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
      fill={iconColor}
      className={className}
    >
      <path d="..." />
    </svg>
  );
};

export default AppleIcon;
