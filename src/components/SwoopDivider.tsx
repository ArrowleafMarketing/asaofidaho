/**
 * Beaver Builder's "swoop2" row shape, reproduced path-for-path.
 *
 * It sits as a top-edge layer on the footer CTA row: 210px tall, stretched to
 * the full row width (`preserveAspectRatio="none"`) and flipped vertically via
 * `scaleY(-1)`, so it reads as the page above curving down into the blue band.
 * The first three paths are translucent offsets that give it its layered look.
 *
 * The fill has to match whatever sits directly above the footer or the shape
 * shows a seam. The original hard-codes #ffffff because GeneratePress puts the
 * page content on a white `.inside-article`; here it tracks the page
 * background token instead, so the two stay in sync if that colour changes.
 */
export function SwoopDivider({
  className = "",
  fillClassName = "fill-asa-page",
}: {
  className?: string;
  /** Tailwind `fill-*` class naming the colour of the section above. */
  fillClassName?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        role="presentation"
        viewBox="0 0 1000 345.15"
        preserveAspectRatio="none"
        className={`absolute top-0 left-0 block h-[210px] w-full -scale-y-100 ${fillClassName}`}
      >
        <g>
          <path
            opacity={0.3}
            d="M604.71,518.12c159.22,0,269.68-182.87,505.29-182.87v230.1H602Z"
            transform="translate(-110 -220.2)"
          />
          <path
            opacity={0.4}
            d="M624.71,518.12c159.22,0,249.68-166.92,485.29-166.92V565.35H624.71Z"
            transform="translate(-110 -220.2)"
          />
          <path
            opacity={0.5}
            d="M624.71,517.8q9.42.32,20,.32c159.22,0,229.68-151,465.29-151v198.2H624.71Z"
            transform="translate(-110 -220.2)"
          />
          <path
            d="M1110,383.09V565.35H110V540.69c212.6,0,219-75.45,297.08-75.45,57.92,0,70,52.88,257.63,52.88C823.93,518.12,874.39,383.09,1110,383.09Z"
            transform="translate(-110 -220.2)"
          />
        </g>
      </svg>
    </div>
  );
}
