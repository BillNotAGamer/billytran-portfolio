export const SIGNATURE_GLYPH_SYMBOL_ID = "signature-glyph";
export const SIGNATURE_BLUEPRINT_SYMBOL_ID = "signature-blueprint";

/**
 * Rendered once per document. SignatureGlyph and SignatureBlueprint reference
 * these symbols with <use>, instead of inlining the same paths 54 times.
 */
export function SignatureSprite() {
  return (
    <svg aria-hidden="true" focusable="false" style={{ display: "none" }}>
      <symbol id={SIGNATURE_GLYPH_SYMBOL_ID} viewBox="0 0 52 52" fill="none">
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
      </symbol>

      <symbol
        id={SIGNATURE_BLUEPRINT_SYMBOL_ID}
        viewBox="0 0 640 640"
        fill="none"
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
      </symbol>
    </svg>
  );
}
