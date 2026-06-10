type LayoutDashboardProps = {
  size?: number;
  color?: string;
  className?: string;
};

const LayoutDashboardIcon = ({
  className = "",
  color = "currentColor",
  size = 24,
}: LayoutDashboardProps) => (
  <svg
    className={`lucide-layout-dashboard ${className}`}
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
    <rect height="9" rx="1" width="7" x="3" y="3" />
    <rect height="5" rx="1" width="7" x="14" y="3" />
    <rect height="9" rx="1" width="7" x="14" y="12" />
    <rect height="5" rx="1" width="7" x="3" y="16" />
  </svg>
);

export default LayoutDashboardIcon;
