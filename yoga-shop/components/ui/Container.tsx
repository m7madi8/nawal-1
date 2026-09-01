import { cn } from "@/lib/utils";
import { ElementType, ComponentPropsWithoutRef } from "react";

interface ContainerProps<T extends ElementType> {
  as?: T;
  className?: string;
  children: React.ReactNode;
}

/**
 * Shared horizontal rhythm for the whole site.
 * Keeps the editorial max-width and gutter consistent across every section
 * so alternating layouts still feel like one coherent grid system.
 */
export function Container<T extends ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: ContainerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Component = as || "div";
  return (
    <Component
      className={cn("mx-auto w-full max-w-editorial px-gutter", className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
