# Next.js migration map

Generated from 28 legacy HTML files. Legacy files remain untouched.

| Legacy file | Next route | Direction | Forms |
|---|---|---|---:|
| `admin/dashboard.html` | `/admin/dashboard` | ltr | 0 |
| `admin/index.html` | `/admin` | ltr | 1 |
| `admin.html` | `/admin` | ltr | 0 |
| `dashboard.html` | `/dashboard` | ltr | 0 |
| `events/ice-bath-experience.html` | `/events/ice-bath-experience` | ltr | 0 |
| `events/ice-bath.html` | `/events/ice-bath` | ltr | 1 |
| `events/nature-chocolate.html` | `/events/nature-chocolate` | ltr | 0 |
| `events/sound-healing.html` | `/events/sound-healing` | ltr | 0 |
| `events.html` | `/events` | ltr | 0 |
| `index.html` | `/` | rtl | 0 |
| `mountain-voice-registration.html` | `/mountain-voice-registration` | rtl | 0 |
| `nawal.html` | `/nawal` | ltr | 0 |
| `register/ice-bath.html` | `/register/ice-bath` | ltr | 1 |
| `register/mountain-voice.html` | `/register/mountain-voice` | ltr | 1 |
| `register/wadi-rum.html` | `/register/wadi-rum` | ltr | 1 |
| `retreat-dahab.html` | `/retreat-dahab` | rtl | 0 |
| `retreat-wadi-rum.html` | `/retreat-wadi-rum` | rtl | 0 |
| `retreat.html` | `/retreat` | rtl | 0 |
| `retreats/dahab.html` | `/retreats/dahab` | ltr | 1 |
| `retreats/wadi-rum.html` | `/retreats/wadi-rum` | ltr | 0 |
| `retreats/zanzibar.html` | `/retreats/zanzibar` | ltr | 1 |
| `retreats.html` | `/retreats` | ltr | 0 |
| `wadi-rum-registration.html` | `/wadi-rum-registration` | rtl | 0 |
| `workshops/al-tira.html` | `/workshops/al-tira` | ltr | 0 |
| `workshops/haifa.html` | `/workshops/haifa` | ltr | 1 |
| `workshops/jiva.html` | `/workshops/jiva` | rtl | 0 |
| `zanzibar-retreat-review-nw2606.html` | `/zanzibar-retreat-review-nw2606` | rtl | 0 |
| `Zanzibar.html` | `/Zanzibar` | rtl | 0 |

## Compatibility layer

The first migration pass renders preserved legacy markup inside route-level Server Components and loads browser behavior through a small Client Component. CSS/JS are copied to `public/legacy`; original files remain in place. This isolates existing DOM-driven behavior while enabling incremental conversion to idiomatic React components.

## Environment configuration

No new secrets were added. Existing integrations remain isolated in legacy scripts pending endpoint-by-endpoint adapter validation.
