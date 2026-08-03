type RaceCheckersProps = {
  className?: string;
  dark?: boolean;
};

export function RaceCheckers({
  className = "",
  dark = false,
}: RaceCheckersProps) {
  return (
    <span
      className={`race-checkers${dark ? " race-checkers--dark" : ""} ${className}`}
      aria-hidden
    >
      <span className="race-checkers-grid" />
    </span>
  );
}
