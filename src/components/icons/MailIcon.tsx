type MailIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const MailIcon = ({
  size = 24,
  color = "currentColor",
  className = "",
}: MailIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide-mail ${className}`}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 6L12 13L2 6" />
  </svg>
);

export default MailIcon;
