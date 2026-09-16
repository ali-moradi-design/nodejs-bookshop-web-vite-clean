# Clean Architecture (Niko Bookshop SPA)

This storefront uses **Clean Architecture** adapted for a Vite + React + TypeScript SPA.

## Layers

| Layer             | Responsibility                                                    | May import                                                      |
| ----------------- | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| `domain/`         | Entities, pure helpers, **repository port interfaces** only       | nothing inward                                                  |
| `application/`    | Use-case factories / interactors                                  | `domain` only                                                   |
| `infrastructure/` | HTTP client, repository adapters, local storage, composition root | `domain`, `application` (ports/use-cases), `shared`             |
| `presentation/`   | React UI, pages, React Query hooks, auth store                    | `application` (use-case facade types), `domain` types, `shared` |
| `app/`            | Bootstrap: router, root providers, global styles, **DI wiring**   | all layers (composition root)                                   |
| `shared/`         | UI kit, i18n, config, pure utils — **no domain business logic**   | nothing from other app layers                                   |

## Dependency rule

```
domain ← application ← infrastructure
                ↖ presentation ← app (wires everything)
shared is cross-cutting but must not depend on domain/application/…
```

- **domain** never imports React, fetch, or outer layers.
- **application** use cases take repository **ports** as arguments (factories).
- **infrastructure** implements ports (`*RepositoryHttp`, storage adapters).
- **presentation** hooks call **bound use cases** from DI — never `infrastructure/http` or repository classes directly.
- **app/providers** calls `createDependencies()` and provides them via `DependenciesProvider`.

## DI wiring

```ts
// app/providers
const dependencies = useMemo(() => createDependencies(), []);
<DependenciesProvider dependencies={dependencies}>…</DependenciesProvider>
```

`createDependencies()` (in `infrastructure/composition`) binds HTTP repositories into use-case factories and returns an `AppDependencies` facade. Presentation uses `useDependencies()` (React) or `getAppDependencies()` (auth store).

## Use-case list (facade)

Auth/users: `login`, `register`, `logout`, `fetchMe`, `updateUser`, `listUsers`, `getUser`, `createUser`, `deleteUser`

Catalog: `getBooks`, `getFeaturedBooks`, `getBook`, `createBook`, `updateBook`, `deleteBook`, `uploadBookCover`

Cart/checkout: `getCart`, `addToCart`, `updateCartItem`, `removeCartItem`, `clearCart`, `checkout`

Orders: `getOrders`, `getOrder`, `payOrder`, `updateOrderStatus`

Favorites: `getFavorites`, `addFavorite`, `removeFavorite`

Reviews: `getReviews`, `createReview`, `updateReview`, `deleteReview`

Reports: `getIssues`, `createIssue`, `updateIssue`, `deleteIssue`

Admin RBAC/discounts: `getDiscounts`, `createDiscount`, `updateDiscount`, `deleteDiscount`, `getRoles`, `createRole`, `updateRole`, `deleteRole`, `getPermissions`, `createPermission`, `updatePermission`, `deletePermission`

Admin analytics: `getDashboardSummary`, `getRecentOrders`, `getLowStock`, `getRevenue`, `getOrdersByStatus`, `getTopBooks`, `getSalesByDate`

Local: `readRecentlyViewed`, `pushRecentlyViewed`

## Presentation layout

UI is grouped by area under `presentation/components/<area>/` with route screens in `presentation/pages/`. Hooks live in `presentation/hooks/` and only talk to use cases.

## Boundary check

```bash
pnpm check:architecture
```

Fails on leftover `src/features`, domain/application importing outer layers, presentation importing infrastructure HTTP/repos/storage/composition, and shared importing app layers.

ESLint `no-restricted-imports` mirrors these rules.
