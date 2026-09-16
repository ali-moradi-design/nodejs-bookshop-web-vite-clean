import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { analyticsKeys } from '../query-keys';

export function useTopBooksQuery(from?: string, to?: string) {
  const { getTopBooks } = useDependencies();
  return useQuery({
    queryKey: analyticsKeys.topBooks(from, to),
    queryFn: () => getTopBooks(from, to),
  });
}
