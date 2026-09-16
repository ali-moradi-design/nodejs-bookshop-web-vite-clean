import { useQuery } from '@tanstack/react-query';
import type { BookListParams } from '@/domain';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { bookKeys } from '../query-keys';

type Options = { enabled?: boolean };

export function useBooksQuery(params: BookListParams = {}, options: Options = {}) {
  const { enabled = true } = options;
  const { getBooks } = useDependencies();
  return useQuery({
    queryKey: bookKeys.list(params),
    queryFn: () => getBooks(params),
    enabled,
  });
}
