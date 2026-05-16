import { cn } from "@/lib/utils";

type SignatureGlyphProps = {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  subdued?: boolean;
};

const sizeClasses = {
  xs: "h-8 w-8 rounded-[1rem]",
  sm: "h-10 w-10 rounded-[1.15rem]",
  md: "h-12 w-12 rounded-[1.35rem]",
  lg: "h-16 w-16 rounded-[1.75rem]",
} as const;

export function SignatureGlyph({
  className,
  size = "sm",
  subdued = false,
}: SignatureGlyphProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden border text-current shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        subdued
          ? "border-white/8 bg-white/[0.02]"
          : "border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]",
        sizeClasses[size],
        className,
      )}
    >
      <span className="absolute inset-[18%] rounded-[0.8rem] border border-white/7" />
      <svg viewBox="0 0 52 52" fill="none" className="relative z-10 h-[62%] w-[62%]">
        <path
          d="M10 36H20C28 36 32 32 32 24V10"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M18 42H30C38 42 42 38 42 30V10"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.55"
        />
        <circle cx="32" cy="10" r="3.2" fill="currentColor" opacity="0.95" />
      </svg>
    </span>
  );
}
