import { Reveal } from "@/components/ui/reveal";
import { SectionPill } from "@/components/ui/section-pill";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  align?: "left" | "center";
  className?: string;
  description: string;
  eyebrow: string;
  title: string;
  titleId?: string;
};

export function SectionHeading({
  align = "left",
  className,
  description,
  eyebrow,
  title,
  titleId,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Reveal>
        <SectionPill className={centered ? "justify-center" : undefined}>
          {eyebrow}
        </SectionPill>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          id={titleId}
          className="font-display text-4xl font-semibold tracking-[-0.04em] text-balance text-foreground sm:text-5xl lg:text-[3.5rem]"
        >
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="max-w-2xl text-base leading-8 text-muted-strong sm:text-lg">
          {description}
        </p>
      </Reveal>
    </div>
  );
}
