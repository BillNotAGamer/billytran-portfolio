import { cn } from "@/lib/utils";

type SignatureBlueprintProps = {
  className?: string;
};

export function SignatureBlueprint({ className }: SignatureBlueprintProps) {
  return (
    <svg
      viewBox="0 0 640 640"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <rect
        x="54"
        y="54"
        width="532"
        height="532"
        rx="152"
        stroke="currentColor"
        strokeOpacity="0.08"
        strokeWidth="2"
      />
      <path
        d="M118 438H262C382 438 440 380 440 260V94"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M206 546H354C484 546 546 484 546 354V94"
        stroke="currentColor"
        strokeOpacity="0.34"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <circle cx="440" cy="94" r="24" fill="currentColor" fillOpacity="0.78" />
      <circle cx="546" cy="94" r="16" fill="currentColor" fillOpacity="0.22" />
    </svg>
  );
}
