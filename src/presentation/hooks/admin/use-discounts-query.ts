import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { discountKeys } from '../query-keys';

export function useDiscountsQuery() {
  const { getDiscounts } = useDependencies();
  return useQuery({
    queryKey: discountKeys.list(),
    queryFn: () => getDiscounts(),
  });
}
