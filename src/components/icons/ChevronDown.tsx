type ChevronDownProps = {
  size?: number;
  color?: string;
  className?: string;
};

const ChevronDown = ({
  className = "",
  color = "currentColor",
  size = 24,
}: ChevronDownProps) => (
  <svg
    className={`lucide-chevron-down ${className}`}
    fill="none"
    height={size}
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default ChevronDown;
