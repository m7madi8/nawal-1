# hooks/

Reserved for custom React hooks as the app grows — e.g. `useCart()` once
real commerce state is wired up, or `useGSAPScrollTrigger()` if a future
section needs scroll-scrubbed animation (see main README → "Extending
this later").

Empty for now on purpose: nothing in this build needs a hook beyond
what's already local to components (`useState` in `ProductPurchaseExperience`,
`useScroll`/`useTransform` in `Hero`).
