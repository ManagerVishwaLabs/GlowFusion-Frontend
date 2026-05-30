type InfoCircleIconProps = {
  className?: string;
  size?: number;
  color?: string;
};

export default function InfoCircleIcon({
  className = "",
  size = 24,
  color = "currentColor",
}: InfoCircleIconProps) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}
