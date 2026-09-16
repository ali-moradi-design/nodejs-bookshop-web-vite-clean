import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { bookKeys } from '../query-keys';

type Options = { enabled?: boolean };

export function useBookQuery(id: string, options: Options = {}) {
  const { enabled = true } = options;
  const { getBook } = useDependencies();
  return useQuery({
    queryKey: bookKeys.detail(id),
    queryFn: () => getBook(id),
    enabled: enabled && Boolean(id),
  });
}
