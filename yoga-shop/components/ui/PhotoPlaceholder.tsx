import { cn } from "@/lib/utils";

interface PhotoPlaceholderProps {
  label: string;
  tone?: "cream" | "sand" | "stone" | "charcoal" | "pink";
  className?: string;
  /** aspect-[w/h] tailwind class, e.g. "aspect-[4/5]" */
  aspect?: string;
}

const tones: Record<NonNullable<PhotoPlaceholderProps["tone"]>, string> = {
  cream: "bg-cream",
  sand: "bg-sand",
  stone: "bg-stone",
  charcoal: "bg-charcoal text-cream/60",
  pink: "bg-muted-pink",
};

/**
 * TEMPORARY photography slot.
 *
 * Real cinematic product/lifestyle photography is central to this brief —
 * this placeholder exists only so the layout, spacing, and motion can be
 * evaluated before assets exist. Replace with <Image> from next/image
 * pointing at /public/images/products/** once photography is shot.
 * See README.md → "Photography" for the exact shot list per slot.
 */
export function PhotoPlaceholder({
  label,
  tone = "sand",
  className,
  aspect = "aspect-[4/5]",
}: PhotoPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-editorial",
        aspect,
        tones[tone],
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, currentColor 0%, transparent 45%), radial-gradient(circle at 80% 80%, currentColor 0%, transparent 40%)",
        }}
      />
      <span className="relative font-body text-xs uppercase tracking-[0.18em] opacity-40">
        {label}
      </span>
    </div>
  );
}
