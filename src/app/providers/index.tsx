import { useMemo } from 'react';
import { Toaster } from 'sonner';
import { createDependencies } from '@/infrastructure/composition';
import { DependenciesProvider } from '@/presentation/providers/dependencies-provider';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';
import { I18nProvider } from './i18n-provider';
import { AuthBootstrap } from './auth-bootstrap';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const dependencies = useMemo(() => createDependencies(), []);

  return (
    <DependenciesProvider dependencies={dependencies}>
      <QueryProvider>
        <I18nProvider>
          <ThemeProvider>
            <AuthBootstrap>
              {children}
              <Toaster richColors position="top-center" />
            </AuthBootstrap>
          </ThemeProvider>
        </I18nProvider>
      </QueryProvider>
    </DependenciesProvider>
  );
}
