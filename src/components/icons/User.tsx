import type { IconProps } from "./types";
import { getIconColor, getIconSize } from "./icon.utils";

const UserIcon = ({
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
      className={`lucide-user ${className}`}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

export default UserIcon;
