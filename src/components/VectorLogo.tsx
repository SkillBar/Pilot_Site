type VectorLogoProps = {
  className?: string;
};

export function VectorLogo({ className = "" }: VectorLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 28 28"
        className="h-5 w-5 shrink-0"
        aria-hidden
      >
        <path
          d="M4 7.5 14 22.5 24 7.5h-4.2L14 15.8 8.2 7.5H4Z"
          fill="currentColor"
        />
        <path
          d="M9.2 7.5h9.6L14 14.2 9.2 7.5Z"
          fill="var(--accent)"
          opacity="0.95"
        />
      </svg>
      <span className="font-display text-[12px] font-bold tracking-[0.18em] text-fg uppercase">
        Vector
      </span>
    </span>
  );
}
