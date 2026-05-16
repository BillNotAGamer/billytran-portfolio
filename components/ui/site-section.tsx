import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type SiteSectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id: string;
  labelledBy: string;
};

export function SiteSection({
  children,
  className,
  containerClassName,
  id,
  labelledBy,
}: SiteSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("section-frame py-24 sm:py-28 lg:py-32", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
