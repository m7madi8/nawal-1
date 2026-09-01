"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Wire this up to real error reporting (Sentry, etc.) before launch.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80vh] items-center bg-cream">
      <Container className="text-center">
        <p className="font-body text-eyebrow uppercase text-soft-brown-dark">
          Something went quiet
        </p>
        <h1 className="mt-4 font-display text-display-md text-charcoal">
          We lost our footing.
        </h1>
        <p className="mt-4 font-body text-base text-charcoal/60">
          Something went wrong loading this page.
        </p>
        <Button size="lg" className="mt-10" onClick={() => reset()}>
          Try Again
        </Button>
      </Container>
    </section>
  );
}
