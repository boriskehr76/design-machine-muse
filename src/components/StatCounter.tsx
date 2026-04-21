import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

interface StatCounterProps {
  value: number | "infinity";
  suffix?: string;
  label: string;
}

export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const target = typeof value === "number" ? value : 0;
  const display = useCountUp(target, inView && typeof value === "number");

  return (
    <div
      ref={ref}
      className="flex flex-col gap-3 border border-border bg-card/40 p-6 transition-colors hover:border-accent/60"
    >
      <span className="font-serif text-5xl leading-none text-foreground sm:text-6xl">
        {value === "infinity" ? "∞" : (
          <>
            {display}
            {suffix}
          </>
        )}
      </span>
      <span className="label-mono">{label}</span>
    </div>
  );
}
