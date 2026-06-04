type LocationIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const LocationIcon = ({
  size = 20,
  color = "#4F6BFF",
  className = "",
}: LocationIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12 21C12 21 19 14.5 19 9.5C19 5.91 15.87 3 12 3C8.13 3 5 5.91 5 9.5C5 14.5 12 21 12 21Z"
      stroke={color}
      strokeWidth="2"
    />
    <circle cx="12" cy="9" r="2" stroke={color} strokeWidth="2" />
  </svg>
);

export default LocationIcon;
