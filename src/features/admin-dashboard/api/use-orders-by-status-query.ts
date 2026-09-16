import { useQuery } from '@tanstack/react-query';
import { analyticsKeys, fetchOrdersByStatus } from './analytics-api';

export function useOrdersByStatusQuery() {
  return useQuery({
    queryKey: analyticsKeys.ordersByStatus(),
    queryFn: async () => (await fetchOrdersByStatus()).data,
  });
}
