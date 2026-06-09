import { getIconColor, getIconSize } from "./icon.utils";
import type { IconProps } from "./types";

const ProfessionalIcon = ({
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
      stroke={iconColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={iconSize}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="14" rx="2" ry="2" width="20" x="2" y="7" />
      <path d="M16 21V5a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v16" />
    </svg>
  );
};

export default ProfessionalIcon;
