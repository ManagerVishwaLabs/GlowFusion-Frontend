import { getIconColor, getIconSize } from "./icon.utils";
import type { IconProps } from "./types";

const SuccessIcon = ({
  className = "",
  color = "success",
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

      <path d="M8 12L11 15L16 9" />
    </svg>
  );
};

export default SuccessIcon;
