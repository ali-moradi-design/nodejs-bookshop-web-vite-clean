import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { orderKeys } from '../query-keys';

export function useOrdersQuery() {
  const { getOrders } = useDependencies();
  return useQuery({
    queryKey: orderKeys.list(),
    queryFn: () => getOrders(),
  });
}
