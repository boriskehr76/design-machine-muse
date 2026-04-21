import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * Vertical dashed line that draws itself downward when scrolled into view.
 */
export function TimelineLine({ height }: { height: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });
  const pathRef = useRef<SVGLineElement | null>(null);

  useEffect(() => {
    if (!inView || !pathRef.current) return;
    const line = pathRef.current;
    line.style.strokeDasharray = "4 8";
    line.style.strokeDashoffset = `${height}`;
    requestAnimationFrame(() => {
      line.style.transition = "stroke-dashoffset 2s cubic-bezier(0.2, 0.7, 0.2, 1)";
      line.style.strokeDashoffset = "0";
    });
  }, [inView, height]);

  return (
    <div ref={ref} className="absolute left-0 top-0 h-full w-px" aria-hidden="true">
      <svg width="2" height={height} className="overflow-visible">
        <line
          ref={pathRef}
          x1="1"
          x2="1"
          y1="0"
          y2={height}
          stroke="hsl(var(--accent))"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
