import { getIconColor, getIconSize } from "./icon.utils";
import type { IconProps } from "./types";

const BuildingIcon = ({
  className = "",
  color = "primary",
  size = "md",
}: IconProps) => {
  const iconSize = getIconSize(size);
  const iconColor = getIconColor(color);

  return (
    <svg
      className={className}
      fill="none"
      height={iconSize}
      viewBox="0 0 24 24"
      width={iconSize}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 21H21"
        stroke={iconColor}
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M5 21V7L12 3L19 7V21"
        stroke={iconColor}
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M9 10H10" stroke={iconColor} strokeWidth="2" />
      <path d="M14 10H15" stroke={iconColor} strokeWidth="2" />
      <path d="M9 14H10" stroke={iconColor} strokeWidth="2" />
      <path d="M14 14H15" stroke={iconColor} strokeWidth="2" />
    </svg>
  );
};

export default BuildingIcon;
