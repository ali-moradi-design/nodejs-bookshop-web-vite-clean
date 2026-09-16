import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { cartKeys } from '../query-keys';

type Options = { enabled?: boolean };

export function useCartQuery(options: Options = {}) {
  const { enabled = true } = options;
  const { getCart } = useDependencies();
  return useQuery({
    queryKey: cartKeys.current(),
    queryFn: () => getCart(),
    enabled,
  });
}
