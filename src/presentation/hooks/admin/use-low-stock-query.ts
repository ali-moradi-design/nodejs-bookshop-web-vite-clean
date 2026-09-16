import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { adminKeys } from '../query-keys';

export function useLowStockQuery(threshold = 5) {
  const { getLowStock } = useDependencies();
  return useQuery({
    queryKey: adminKeys.lowStock(threshold),
    queryFn: () => getLowStock(threshold),
  });
}
