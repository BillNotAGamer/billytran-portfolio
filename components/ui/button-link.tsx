import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "border-transparent bg-[linear-gradient(135deg,rgba(141,224,255,0.98),rgba(121,161,255,0.92),rgba(220,180,123,0.9))] text-slate-950 shadow-[0_28px_60px_-26px_rgba(121,161,255,0.55)] hover:-translate-y-0.5 hover:shadow-[0_34px_70px_-24px_rgba(121,161,255,0.48)]",
  secondary:
    "border-white/10 bg-white/[0.03] text-foreground shadow-[0_18px_40px_-28px_rgba(0,0,0,0.8)] hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.06]",
} as const;

type ButtonLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "className" | "children" | "href"
> & {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: keyof typeof variants;
};

function ButtonContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.22),transparent_36%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative flex items-center gap-3">
        <span>{children}</span>
        <SignatureGlyph
          size="xs"
          subdued
          className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </>
  );
}

export function ButtonLink({
  children,
  className,
  href,
  rel,
  target,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const resolvedRel = target === "_blank" ? rel ?? "noreferrer" : rel;
  const baseClassName = cn(
    "group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border px-5 py-3 text-sm font-medium tracking-[0.02em] transition-[transform,background,border-color,box-shadow,color] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variants[variant],
    className,
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        rel={resolvedRel}
        className={baseClassName}
        {...props}
      >
        <ButtonContent>{children}</ButtonContent>
      </a>
    );
  }

  return (
    <Link href={href} className={baseClassName} {...props}>
      <ButtonContent>{children}</ButtonContent>
    </Link>
  );
}
