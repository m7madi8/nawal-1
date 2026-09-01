export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-cream">
      <div className="h-10 w-10 animate-pulse rounded-full bg-stone" aria-hidden />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
