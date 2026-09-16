import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { analyticsKeys } from '../query-keys';

export function useRevenueQuery(from?: string, to?: string) {
  const { getRevenue } = useDependencies();
  return useQuery({
    queryKey: analyticsKeys.revenue(from, to),
    queryFn: () => getRevenue(from, to),
  });
}
