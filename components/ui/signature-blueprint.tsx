import { SIGNATURE_BLUEPRINT_SYMBOL_ID } from "@/components/ui/signature-sprite";
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
      <use href={`#${SIGNATURE_BLUEPRINT_SYMBOL_ID}`} />
    </svg>
  );
}
