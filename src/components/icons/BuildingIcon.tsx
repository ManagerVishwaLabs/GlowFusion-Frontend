import type { IconProps } from "./types";
import { getIconColor, getIconSize } from "./icon.utils";

const BuildingIcon = ({
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
      className={className}
    >
      <path
        d="M3 21H21"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 21V7L12 3L19 7V21"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M9 10H10" stroke={iconColor} strokeWidth="2" />
      <path d="M14 10H15" stroke={iconColor} strokeWidth="2" />
      <path d="M9 14H10" stroke={iconColor} strokeWidth="2" />
      <path d="M14 14H15" stroke={iconColor} strokeWidth="2" />
    </svg>
  );
};

export default BuildingIcon;
