import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { analyticsKeys } from '../query-keys';

export function useOrdersByStatusQuery() {
  const { getOrdersByStatus } = useDependencies();
  return useQuery({
    queryKey: analyticsKeys.ordersByStatus(),
    queryFn: () => getOrdersByStatus(),
  });
}
