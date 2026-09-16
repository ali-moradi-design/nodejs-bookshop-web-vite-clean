import { useQueries } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { bookKeys } from '../query-keys';

type Options = { enabled?: boolean };

/** Parallel book detail queries for cart line items. */
export function useCartBooksQueries(bookIds: string[], options: Options = {}) {
  const { enabled = true } = options;
  const { getBook } = useDependencies();
  return useQueries({
    queries: bookIds.map((bookId) => ({
      queryKey: bookKeys.detail(bookId),
      queryFn: () => getBook(bookId),
      enabled: enabled && Boolean(bookId),
    })),
  });
}
