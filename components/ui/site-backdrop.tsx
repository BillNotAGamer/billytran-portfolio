import { SignatureBlueprint } from "@/components/ui/signature-blueprint";

export function SiteBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_20%,transparent_78%,rgba(255,255,255,0.02))]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-position:center] [background-size:120px_120px]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(125deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:180px_180px]" />
      <div className="absolute -left-24 top-[-4rem] hidden h-[32rem] w-[32rem] text-accent/12 lg:block">
        <SignatureBlueprint />
      </div>
      <div className="absolute bottom-[-8rem] right-[-6rem] hidden h-[26rem] w-[26rem] text-accent-warm/10 xl:block">
        <SignatureBlueprint />
      </div>
      <div className="absolute left-1/2 top-[-20rem] h-[48rem] w-[48rem] -translate-x-1/2 rounded-full bg-accent-secondary/12 blur-[170px]" />
      <div className="absolute left-[10%] top-[24rem] h-[26rem] w-[26rem] rounded-full bg-accent/8 blur-[180px]" />
      <div className="absolute bottom-[-12rem] right-[8%] h-[30rem] w-[30rem] rounded-full bg-accent-warm/10 blur-[200px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(7,9,15,0.68)_100%)]" />
    </div>
  );
}
