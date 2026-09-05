type StarburstProps = {
  className?: string;
  size?: number;
};

export default function Starburst({ className = "", size = 24 }: StarburstProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`starburst ${className}`}
    >
      <path
        d="M12 0L13.8 9.2L23 11L13.8 12.8L12 22L10.2 12.8L1 11L10.2 9.2L12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
