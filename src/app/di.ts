import { createDependencies } from '@/infrastructure/composition';
import type { AppDependencies } from '@/application';

/** Singleton composition root — created once per SPA session. */
let cached: AppDependencies | null = null;

export function getOrCreateDependencies(): AppDependencies {
  if (!cached) cached = createDependencies();
  return cached;
}

/** Test-only: replace or clear the composition root. */
export function resetDependencies(next: AppDependencies | null = null): void {
  cached = next;
}
