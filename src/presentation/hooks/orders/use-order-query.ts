import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { orderKeys } from '../query-keys';

type Options = { enabled?: boolean };

export function useOrderQuery(id: string, options: Options = {}) {
  const { enabled = true } = options;
  const { getOrder } = useDependencies();
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => getOrder(id),
    enabled: enabled && Boolean(id),
  });
}
