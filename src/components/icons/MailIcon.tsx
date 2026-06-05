import type { IconProps } from "./types";
import { getIconColor, getIconSize } from "./icon.utils";

const MailIcon = ({
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
      className={`lucide-mail ${className}`}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6L12 13L2 6" />
    </svg>
  );
};

export default MailIcon;
