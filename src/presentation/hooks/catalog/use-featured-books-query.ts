import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { bookKeys } from '../query-keys';

export function useFeaturedBooksQuery() {
  const { getFeaturedBooks } = useDependencies();
  return useQuery({
    queryKey: bookKeys.featured(),
    queryFn: () => getFeaturedBooks(),
  });
}
