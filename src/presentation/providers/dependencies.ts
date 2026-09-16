import { AppDependencies } from '@/application';

let deps: AppDependencies | null = null;

/** Set once from the composition root (app bootstrap). */
export function setAppDependencies(next: AppDependencies): void {
  deps = next;
}

export function getAppDependencies(): AppDependencies {
  if (!deps) {
    throw new Error('AppDependencies not initialized — wire createDependencies() in app providers');
  }
  return deps;
}
