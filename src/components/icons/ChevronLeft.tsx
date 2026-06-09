type ChevronLeftProps = {
  size?: number;
  color?: string;
  className?: string;
};

const ChevronLeft = ({
  className = "",
  color = "currentColor",
  size = 24,
}: ChevronLeftProps) => (
  <svg
    className={`lucide-chevron-left ${className}`}
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
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export default ChevronLeft;
