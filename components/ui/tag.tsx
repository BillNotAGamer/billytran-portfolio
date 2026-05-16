import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagProps = {
  accent?: boolean;
  children: ReactNode;
  className?: string;
};

export function Tag({ accent = false, children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm transition-colors",
        accent
          ? "border-accent/18 bg-accent/10 text-accent"
          : "border-white/10 bg-white/[0.03] text-muted-strong",
        className,
      )}
    >
      <span className="relative flex h-3 w-5 items-center">
        <span className="absolute left-0 h-1.5 w-1.5 rounded-full bg-current/90" />
        <span className="absolute right-0 h-px w-3 rounded-full bg-current/45" />
      </span>
      <span>{children}</span>
    </span>
  );
}

