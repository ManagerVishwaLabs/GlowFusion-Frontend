type BuildingIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const BuildingIcon = ({
  size = 20,
  color = "#4F6BFF",
  className = "",
}: BuildingIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path d="M3 21H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path
      d="M5 21V7L12 3L19 7V21"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M9 10H10" stroke={color} strokeWidth="2" />
    <path d="M14 10H15" stroke={color} strokeWidth="2" />
    <path d="M9 14H10" stroke={color} strokeWidth="2" />
    <path d="M14 14H15" stroke={color} strokeWidth="2" />
  </svg>
);

export default BuildingIcon;
