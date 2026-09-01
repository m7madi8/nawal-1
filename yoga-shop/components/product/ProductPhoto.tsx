import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductPhotoProps {
  src?: string;
  alt: string;
  tone?: "cream" | "sand" | "stone" | "charcoal" | "pink";
  className?: string;
  /** aspect-[w/h] tailwind class, e.g. "aspect-[4/5]" */
  aspect?: string;
  priority?: boolean;
}

/**
 * Renders a real product photograph from /public/images/products/** when a
 * src is provided; otherwise falls back to the styled placeholder so every
 * slot keeps its layout even before photography exists.
 */
export function ProductPhoto({
  src,
  alt,
  tone = "sand",
  className,
  aspect = "aspect-[4/5]",
  priority,
}: ProductPhotoProps) {
  if (!src) {
    return (
      <PhotoPlaceholder
        label={alt}
        tone={tone}
        aspect={aspect}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-editorial",
        aspect,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}
