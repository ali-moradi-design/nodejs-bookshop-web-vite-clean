import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { favoriteKeys } from '../query-keys';

type Options = { enabled?: boolean };

export function useFavoritesQuery(options: Options = {}) {
  const { enabled = true } = options;
  const { getFavorites } = useDependencies();
  return useQuery({
    queryKey: favoriteKeys.list(),
    queryFn: () => getFavorites(),
    enabled,
  });
}
