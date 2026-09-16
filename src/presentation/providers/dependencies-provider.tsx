import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { AppDependencies } from '@/application';
import { getAppDependencies, setAppDependencies } from './dependencies';

const DependenciesContext = createContext<AppDependencies | null>(null);

type Props = {
  dependencies: AppDependencies;
  children: ReactNode;
};

export function DependenciesProvider({ dependencies, children }: Props) {
  // Ensure non-React callers (auth store) see the same instance
  setAppDependencies(dependencies);
  const value = useMemo(() => dependencies, [dependencies]);
  return <DependenciesContext.Provider value={value}>{children}</DependenciesContext.Provider>;
}

export function useDependencies(): AppDependencies {
  const ctx = useContext(DependenciesContext);
  if (ctx) return ctx;
  return getAppDependencies();
}
