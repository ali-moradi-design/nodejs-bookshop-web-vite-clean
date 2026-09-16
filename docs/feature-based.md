# Feature-based architecture

This SPA uses a **feature-based** (vertical slice) layout instead of Feature-Sliced Design.

## Layers

| Layer       | Responsibility                                                                                     | Examples                                    |
| ----------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `app/`      | Bootstrap only: providers, router composition, global styles, root layout shells                   | `app/providers`, `app/router`, `app/layout` |
| `features/` | Vertical business slices — each owns `ui` + `api` + `model` (+ `lib`) as needed                    | `catalog`, `cart`, `auth`, `admin-books`    |
| `shared/`   | Cross-cutting only: UI kit, i18n, HTTP client, config, pure helpers — **no domain business logic** | `shared/ui`, `shared/api`, `shared/i18n`    |

There is **no** top-level `entities/`, `widgets/`, or FSD-style `pages/` layer. Route screens live inside the owning feature (e.g. `features/catalog/ui/CatalogPage.tsx`). The router only composes feature public exports.

## Public API rule

External code imports a feature **only** via that feature’s `index.ts`:

```ts
// ✅
import { BookCard, CatalogPage, useBooksQuery } from '@/features/catalog';
import { AddToCartButton, CartPage } from '@/features/cart';

// ❌ deep internals
import { fetchBook } from '@/features/catalog/api/book-api';
```

Features may import from `shared` and from other features **only** through public barrels. Within a feature, prefer relative imports for siblings.

## Feature map

| Feature             | Owns                                                                         |
| ------------------- | ---------------------------------------------------------------------------- |
| `auth`              | Login/register pages, auth store, session, user API, `RequireAuth`           |
| `catalog`           | Books API/UI, filters, search, book grid/detail, catalog & book-detail pages |
| `cart`              | Cart API/hooks, cart sheet/panel, cart page                                  |
| `checkout`          | Checkout form/mutation, checkout page                                        |
| `orders`            | Orders API, pay-order, panel orders list & detail                            |
| `favorites`         | Favorites API/toggle, favorites page                                         |
| `reviews`           | Reviews API/forms, love rating, my-reviews page                              |
| `profile`           | Profile form, panel dashboard page                                           |
| `home`              | Hero, recently-viewed, home page                                             |
| `reports`           | Issue reports API/form, report page, analytics query helpers                 |
| `admin-dashboard`   | Admin summary API, KPI cards, charts, dashboard & analytics pages            |
| `admin-books`       | Admin books CRUD panel + page                                                |
| `admin-orders`      | Admin orders panel + page                                                    |
| `admin-users`       | Admin users panel + page                                                     |
| `admin-roles`       | Roles API + admin panel/page                                                 |
| `admin-permissions` | Permissions API + admin panel/page                                           |
| `admin-discounts`   | Discounts API + admin panel/page                                             |
| `admin-reports`     | Admin issue management panel/page                                            |
| `theme`             | Theme switcher                                                               |
| `locale`            | Locale switcher                                                              |

## `app/layout`

Root chrome composed by the router (not domain features):

- `Header`, `Footer`, `StorefrontShell`, `PanelShell`, `AdminShell`

## Where new code goes

- **New screen / route** → owning `features/<name>/ui/*Page.tsx`, wire in `app/router`.
- **Domain API + hooks + UI for one capability** → same feature folder.
- **Button primitive, `cn()`, API client, theme tokens** → `shared`.

## Boundary check

```bash
pnpm check:architecture
```

Fails on leftover FSD folders, deep cross-feature imports, and imports of deleted layers.
