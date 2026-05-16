import type { ReactNode } from "react";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { cn } from "@/lib/utils";

type SectionPillProps = {
  caps?: boolean;
  children: ReactNode;
  className?: string;
  iconClassName?: string;
};

export function SectionPill({
  caps = true,
  children,
  className,
  iconClassName,
}: SectionPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.02] px-3 py-2 text-[0.72rem] text-accent/80",
        caps ? "uppercase tracking-[0.3em]" : "tracking-[0.12em]",
        className,
      )}
    >
      <SignatureGlyph
        size="xs"
        subdued
        className={cn("text-accent", iconClassName)}
      />
      <span>{children}</span>
    </div>
  );
}
