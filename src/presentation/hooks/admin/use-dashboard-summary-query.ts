import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { adminKeys } from '../query-keys';

export function useDashboardSummaryQuery() {
  const { getDashboardSummary } = useDependencies();
  return useQuery({
    queryKey: adminKeys.summary(),
    queryFn: () => getDashboardSummary(),
  });
}
