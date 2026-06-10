import { getIconColor, getIconSize } from "./icon.utils";
import type { IconProps } from "./types";

const UploadCloudIcon = ({
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
        d="M12 16V8"
        stroke={iconColor}
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M8 12L12 8L16 12"
        stroke={iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M20 16.5C21.2 15.7 22 14.3 22 12.7C22 10.2 20 8.2 17.5 8.2H16.8C15.9 5.7 13.6 4 11 4C7.7 4 5 6.7 5 10C2.8 10.3 1 12.2 1 14.5C1 17 3 19 5.5 19H18"
        stroke={iconColor}
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default UploadCloudIcon;
