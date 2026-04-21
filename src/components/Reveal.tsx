import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
  id?: string;
}

export function Reveal({ children, className, delay = 0, as: Tag = "div", id }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      id={id}
      ref={ref as never}
      className={cn("reveal", inView && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
