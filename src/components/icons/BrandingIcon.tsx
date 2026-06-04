type BrandingIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const BrandingIcon = ({
  size = 20,
  color = "#4F6BFF",
  className = "",
}: BrandingIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path d="M12 3L4 7V17L12 21L20 17V7L12 3Z" stroke={color} strokeWidth="2" />
    <path
      d="M12 8L8 11V15L12 17L16 15V11L12 8Z"
      stroke={color}
      strokeWidth="2"
    />
  </svg>
);

export default BrandingIcon;
