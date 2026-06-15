import { getIconColor, getIconSize } from "./icon.utils";
import type { IconProps } from "./types";

const MailIcon = ({
  className = "",
  color = "primary",
  size = 24,
}: IconProps) => {
  const iconSize = getIconSize(size);
  const iconColor = getIconColor(color);

  return (
    <svg
      className={`lucide-mail ${className}`}
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
      <rect height="16" rx="2" width="20" x="2" y="4" />
      <path d="M22 6L12 13L2 6" />
    </svg>
  );
};

export default MailIcon;
