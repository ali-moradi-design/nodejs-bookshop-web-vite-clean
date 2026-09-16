import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { adminKeys } from '../query-keys';

export function useRecentOrdersQuery(limit = 10) {
  const { getRecentOrders } = useDependencies();
  return useQuery({
    queryKey: adminKeys.recentOrders(limit),
    queryFn: () => getRecentOrders(limit),
  });
}
