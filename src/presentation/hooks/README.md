# Presentation hooks

React Query / view-model hooks **must** call `useDependencies()` use-cases.
They must **not** import `@/infrastructure/**` or call `apiGet`/`apiPost` directly.
