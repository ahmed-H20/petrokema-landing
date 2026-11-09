# Petrokema Landing

Landing site for مصنع بتروكيما للدهانات (Petrochem Paints Factory, Egypt). Arabic-first, RTL. Frontend only.

## Stack
React 18 · Vite 5 (JS/JSX, no TS) · Tailwind 3 · React Router 6 · Framer Motion · Axios · lucide-react.
Alias `@` → `src/`. Dev server port 3000. Scripts: `npm run dev | build | preview`. No tests, no linter.

## Structure
- `src/App.jsx` — router + preloader (`LoadingScreen`). Routes: `/`, `/products`, `/products/:id`, `/about`, `/contact`, `*`. All under `MainLayout`.
- `src/pages/` — route-level pages (large; Contact/About/Products/ProductDetails are 400–600 lines).
- `src/features/{hero,products,about,contact}/` — feature components + `hooks/`.
- `src/components/layout/` (Navbar, Footer, MainLayout) · `src/components/ui/` (Button, Badge, Input, ScrollReveal, FloatingWhatsApp, WhatsAppIcon, LoadingScreen).
- `src/api/` — axios client + services (see below). `src/hooks/useFetch.js` generic fetch hook.
- `src/utils/constants.js` — `COMPANY_INFO`, `SUPPORT_CONTACTS`, `NAV_LINKS`, `SOCIAL_LINKS`, `HERO_COLOR_PALETTES` (28 shades in one rainbow-ordered run: neutrals light→dark, then hues red→blue→pink; 15 of them have `baked: true` baked-in wall images in `public/media/images/hero/*.webp`, lazy-loaded via `utils/preloadImage.js`, no tint overlay). Single source for contact/social data.
- `src/utils/whatsapp.js` — builds Arabic quote messages + wa.me URLs. Quotes go through WhatsApp, not prices.
- `scripts/generate-wall-variants.cjs` — one-off sharp script for hero wall images.

## Data: mocked vs real
Backend `api.petrokema.tech` **does not exist yet**. Everything runs on mock data with fallbacks.
- `api/axiosClient.js` — base URL `VITE_API_BASE_URL` (default `http://localhost:8400/api/v1`), `Accept-Language: ar`, unwraps `response.data`, normalizes errors to Arabic messages. `resolveImageUrl()` prefixes `/uploads…` with `VITE_SERVER_URL`.
- `api/products.api.js` — `MOCK_PRODUCTS` (15 products ordered by application stage) + `getProducts / getProductById / getCategories / getFeaturedPromo`. Tries API, falls back to mock on error. Used by `useProducts`.
- `api/productsService.js` — wrapper + `PRODUCT_CATEGORIES` and a second legacy mock DB (`MOCK_PRODUCTS_DATABASE`, ids like `acrylic-1`). Overlaps with `products.api.js`; check which one a component imports before editing.
- `api/aboutService.js` / `api/contactService.js` — mock about/contact content, API call with mock fallback.
- `api/contact.api.js` — `submitContactForm` and `subscribeNewsletter` **always report success** (errors swallowed, fake `PETRO-xxxxxx` id). Nothing is actually sent until the backend exists.
- Real today: static content, WhatsApp deep links, Google Maps embed, social links.
- Swapping to the real API = remove the fallback branches; keep response shape via `normalizeProduct`.

## Design tokens (`tailwind.config.js`)
- Colors: `brand-navy` (DEFAULT `#0f1f38`, deep, light, accent), `brand-orange` (DEFAULT `#e85d26`, hover, light, soft), `brand-blue` (DEFAULT, vibrant, teal), `brand-emerald`, `brand-gold`.
- Fonts: Cairo (default body), Tajawal. Loaded from Google Fonts in `index.html`.
- Shadows: `shadow-card`, `shadow-card-hover`, `shadow-hero-btn`. Radii: `2xl` 1rem, `3xl` 1.5rem, `4xl` 2rem.
- Page bg `slate-50`, text `slate-800`. Orange is the accent/CTA color, navy for dark surfaces.
- `index.html` is `lang="ar" dir="rtl"`; `index.css` also sets `direction: rtl`.
- Use existing `components/ui/*` before adding new primitives. Use Tailwind classes with brand tokens, not raw hex.

## Deploy
Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) SSHs to VPS → `git reset --hard origin/main` → `docker compose up -d --build`. Multi-stage Dockerfile (node 20 build → nginx alpine, SPA `try_files` fallback). Container maps `3001:80`. `VITE_*` vars are baked at build time via Docker build args. **Every push to main is a production deploy.**

## Working rules
- I work solo, directly on `main`. No feature branches or PRs unless I ask.
- One Claude Code session per feature. Keep scope to the feature asked.
- Git history is the project memory. No `memory.md`. Write descriptive commit messages (conventional style: `feat:`, `fix:`).
- I send small prompts one at a time. Do the one thing asked, then stop and wait.
- Run `/review` and `/security-review` after each feature.
- Use `/imprint` on UI tasks only.
- Commit/push only when I ask (push = deploy).

## Hard constraints
- **Keep Arabic copy and RTL intact.** Don't translate, reword, or reorder Arabic text. Use RTL-safe layout (logical properties / `start`/`end`, `space-x-reverse`, mirrored icons/arrows where needed). Check both directions of animation offsets.
- **Product prices are intentionally omitted** (company policy). Never add price fields, price UI, or invented prices. Pricing is via WhatsApp quote request.
- **Never touch `.env`** (read, edit, or print it). Note: it is tracked in git; flag that to me rather than changing it.
- **Never touch media assets**: `media/` and `public/media/` (images, icons, product shots). Don't rename, move, delete, regenerate, or optimize them. Reference existing paths only. Many filenames contain spaces/Arabic characters; leave as-is.
- Don't invent company facts (phones, addresses, stats, certifications). Take contact data from `utils/constants.js`.
