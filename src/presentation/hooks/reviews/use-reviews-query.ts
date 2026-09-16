import { useQuery } from '@tanstack/react-query';
import type { ReviewListParams } from '@/domain';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { reviewKeys } from '../query-keys';

type Options = { enabled?: boolean };

export function useReviewsQuery(params: ReviewListParams = {}, options: Options = {}) {
  const { enabled = true } = options;
  const { getReviews } = useDependencies();
  return useQuery({
    queryKey: reviewKeys.list(params),
    queryFn: () => getReviews({ ...params, limit: params.limit ?? 100 }),
    enabled,
  });
}
