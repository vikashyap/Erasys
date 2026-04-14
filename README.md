# Erasys Frontend Monorepo

Erasys is a Turbo-powered pnpm monorepo with three apps and two shared packages:

- `apps/web` - Next.js app router app with SSR, ISR, and SEO metadata
- `apps/spa` - Vite React SPA with React Query and a local API proxy
- `apps/mobile` - Expo React Native app with React Query
- `packages/pictures` - shared picture fetching and normalization logic
- `packages/ui` - shared React UI primitives

Turbo keeps the monorepo tasks coordinated, so `dev`, `build`, `test`, `typecheck`, and `lint` can run across the workspace with one command while still respecting package boundaries and caching.

## Prerequisites

- Node.js 20+
- pnpm 10+

## Install

```bash
pnpm install
```

## Run

Start every app in parallel:

```bash
pnpm dev
```

Run the root start command when you want the Next app and the SPA preview together:

```bash
pnpm start
```

Run a single app directly:

```bash
pnpm --filter @erasys/web dev
pnpm --filter @erasys/spa dev
pnpm --filter @erasys/mobile dev
```

To try the Expo app on a phone:

1. install the Expo Go app on your device
2. run `pnpm --filter @erasys/mobile dev`
3. scan the QR code from the terminal or Metro window
4. open the app in Expo Go on your phone

If you prefer an emulator, you can use the Expo commands shown in the terminal instead of scanning the QR code.

SPA preview serves the built app, so build it first:

```bash
pnpm --filter @erasys/spa build
pnpm --filter @erasys/spa preview
```

## Test and typecheck

Run all tests:

```bash
pnpm test
```

Run type checks:

```bash
pnpm typecheck
```

Run linting:

```bash
pnpm lint
```

## Build

Build everything:

```bash
pnpm build
```

Build a single package:

```bash
pnpm --filter @erasys/web build
pnpm --filter @erasys/spa build
pnpm --filter @erasys/mobile build
pnpm --filter @erasys/pictures build
pnpm --filter @erasys/ui build
```

## Notes

- The shared `packages/pictures` module powers the gallery data across all apps.
- The shared `packages/ui` package holds the reusable layout and typography primitives.
- The SPA uses a Vite dev proxy for the gallery API, while the Next app fetches on the server.

## Next.js rendering model

The Next app uses a hybrid server-rendering setup:

- `apps/web/app/layout.tsx` defines the cached shell and revalidates once per hour with `export const revalidate = 3600`.
- The shell includes the header, footer, page frame, and the fallback UI used while the gallery is loading.
- `apps/web/components/gallery-grid.tsx` calls `await connection()` so the gallery content is rendered on the request path instead of being fully static.
- The gallery data comes from `fetchUserPictures({ init: { next: { revalidate: 300 } } })`, which keeps the remote profile response cached for five minutes.
- `apps/web/app/page.tsx` wraps the gallery in `Suspense`, so the shell can render first and the gallery stream in separately.

In practice, that means:

1. the shell is cached and revalidated hourly,
2. the gallery HTML is rendered on the server per request,
3. the remote picture data is cached for a short window,
4. the page still feels fast because the fallback and shell can paint before the gallery finishes loading.

## SPA strategy

The SPA keeps the gallery client-side and uses React Query to manage the data flow.

`apps/spa/src/hooks/use-gallery-pictures.ts` fetches the gallery through the shared `fetchUserPictures` helper, but React Query owns the request lifecycle in the UI.

Why React Query works well here:

- it caches the gallery data automatically
- it handles loading and error states cleanly
- it can refetch in the background if we want to refresh the data later
- it gives us query keys, selection, and cache control without writing our own request state machine

A plain `fetch` plus `AbortSignal` would also work, but we would need to wire up more of the state ourselves:

- pending and error flags
- retry behavior
- cache invalidation
- stale data handling
- background refreshes

React Query gives that behavior out of the box, so the code stays smaller and easier to explain.

For rendering, the SPA currently uses a grid of image cards. If the gallery gets larger, the next optimization would be virtualization in the browser. That would keep only the visible image cards mounted, which means:

- fewer DOM nodes
- less layout work
- less memory pressure
- smoother scrolling on large galleries

The strategy is simple:

1. React Query manages the data.
2. The grid renders the visible gallery.
3. Virtualization can be added later if the gallery becomes big enough to justify it.

## Mobile strategy

The Expo app uses the same shared picture package, but the UI is native and the gallery is rendered with React Native primitives.

`apps/mobile/src/hooks/use-gallery-pictures.ts` uses React Query to fetch and cache the gallery data. The screen then renders the result with a `FlatList` grid in `apps/mobile/src/screens/gallery-screen.tsx`.

What we do in mobile today:

- fetch the shared picture data once through React Query
- show loading and error states in the screen
- render the gallery as a two-column list
- keep the image cards simple and native

Why React Query is a good fit here:

- it keeps the data logic consistent with the SPA
- it caches the gallery response
- it handles retries, stale data, and request state cleanly
- it avoids us writing custom loading/error/cache plumbing in every screen

What we could use instead of React Query:

- plain `fetch` with `useEffect` and `AbortController`
- a custom hook that owns loading, error, and retry state
- a lighter state library if we only want basic caching
- server-driven hydration patterns if the mobile data shape becomes more shared with web

For now, React Query is the simplest good option because it gives us the cache and request lifecycle we want without extra code.

The main future optimization on mobile would be list virtualization. We already use a `FlatList`, so if the gallery grows larger, the next step would be to tighten the list rendering further or move to a more aggressive virtualization library. That would reduce mounted nodes and keep scrolling smooth on lower-end devices.

## Testing strategy

Right now, the main unit test coverage lives in `packages/pictures`.

Those tests focus on the picture data pipeline:

- URL building
- remote profile fetching
- JSON parsing
- normalization
- deduplication
- default dimensions
- error handling

That gives us confidence in the shared data layer, which is the most reusable and least UI-specific part of the repo.

For the apps themselves, we currently rely on typechecking and the app-level build flow. We are intentionally not over-testing every UI primitive yet, because the component layer is still small and mostly structural.

If we want to expand testing later, the next likely steps would be:

- add component tests for the shared UI primitives
- add integration tests for the Next gallery and SPA gallery flows
- add mobile screen tests once the RN UI settles further
- add visual regression tests if we want to lock in the gallery layout across apps

For now, the test strategy stays focused: the shared picture logic is covered, and the apps are validated through typecheck/build.

## Shared pictures package

`packages/pictures` is the data layer shared by all apps.

It does three jobs:

1. it builds the remote profile URL from a slug or explicit endpoint
2. it fetches JSON from the upstream API
3. it normalizes the response into a gallery-friendly `UserPicture` shape

That normalization step is what keeps the apps simple. Each app receives the same final picture object with:

- `src`
- `width` and `height`
- `aspectRatio`
- `alt`
- `isPublic`

The package also handles a few small rules for us:

- it gives missing images default dimensions
- it deduplicates preview and gallery pictures by token
- it keeps the preview image first when one exists
- it falls back to a default profile name for alt text

What we could improve later:

- add runtime schema validation so malformed API responses fail loudly and predictably
- make the image base URL configurable per environment instead of hard-coding it
- support multiple upstream providers behind the same normalized picture API
- add richer metadata, such as captions or source attribution, if the product needs it
- move the normalization rules into smaller helpers if the package grows further

For now, the package stays intentionally small: one fetch path in, one normalized picture shape out.

## Shared UI package

`packages/ui` holds the shared presentation primitives used by the apps.

The main idea is to keep the components headless and composable. The package provides structure and behavior, while each app supplies the actual content and styling.

That shows up most clearly in the compound `Header` and `Footer` components:

- `Header` owns the sticky shell and inner layout
- `Header.Brand`, `Header.Nav`, `Header.Actions`, and `Header.Link` let the app compose the content without passing a long prop list through the tree
- `Footer` owns the outer layout
- `Footer.Copyright`, `Footer.Links`, `Footer.LinksList`, and `Footer.Link` let the app keep the footer declarative and easy to read

This avoids prop drilling because the app does not need to thread a dozen props into one big component API. Instead, the app writes the structure directly and the shared component handles the outer layout.

The same package also includes smaller primitives:

- `Card` for grouped content blocks
- `Container` for page width and horizontal padding
- `ImageFrame` for a consistent image shell
- `Text` for controlled typography tags

Why the headless approach works here:

- the apps keep their own visual identity
- the shared package stays small and reusable
- new sections can be composed without expanding a giant prop API
- the code reads like markup instead of configuration

What we could improve later:

- add more compound slots if the header or footer grows
- tighten the polymorphic typing on `Text` if we want stronger tag-specific props
- add theme tokens or variant props if we want less Tailwind class repetition
- extract more layout primitives only when a pattern appears in more than one app
- add storybook or a component showcase if we want a clearer design system workflow

The current goal is simplicity: a few primitives, a small API surface, and no prop-heavy wrapper components.
