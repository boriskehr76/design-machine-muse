import { useEffect, useRef } from "react";

/**
 * Decorative animated Gaussian bell curve for the hero background.
 * Draws in via stroke-dashoffset on mount, then loops a subtle opacity pulse via Tailwind.
 */
export function GaussianCurve() {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    // trigger the draw-in
    requestAnimationFrame(() => {
      path.style.transition = "stroke-dashoffset 2.6s cubic-bezier(0.2, 0.7, 0.2, 1)";
      path.style.strokeDashoffset = "0";
    });
  }, []);

  // Build a Gaussian path in SVG user units. viewBox 0 0 1000 400.
  // f(x) = peak * exp(-((x - mu)^2) / (2*sigma^2))
  const buildPath = () => {
    const W = 1000;
    const H = 400;
    const baseline = H * 0.85;
    const peak = H * 0.7;
    const mu = W / 2;
    const sigma = W / 7.5;
    const points: string[] = [];
    const steps = 220;
    for (let i = 0; i <= steps; i++) {
      const x = (W * i) / steps;
      const y = baseline - peak * Math.exp(-Math.pow(x - mu, 2) / (2 * sigma * sigma));
      points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return points.join(" ");
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[68%] w-full animate-curve-pulse"
      >
        <defs>
          <linearGradient id="curveFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            <stop offset="20%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            <stop offset="80%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.06" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Fill under curve */}
        <path d={`${buildPath()} L1000 340 L0 340 Z`} fill="url(#curveFill)" />

        {/* Baseline tick marks (mono detail) */}
        {[-3, -2, -1, 0, 1, 2, 3].map((n) => {
          const x = 500 + (n * 1000) / 7.5;
          return (
            <line
              key={n}
              x1={x}
              x2={x}
              y1={340}
              y2={348}
              stroke="hsl(var(--accent))"
              strokeOpacity={0.35}
              strokeWidth={1}
            />
          );
        })}

        {/* The animated curve itself */}
        <path
          ref={pathRef}
          d={buildPath()}
          fill="none"
          stroke="url(#curveFade)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
