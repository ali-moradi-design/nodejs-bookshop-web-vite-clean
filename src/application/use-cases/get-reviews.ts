import type { IReviewRepository, ReviewListParams } from '@/domain';
export const createGetReviews =
  (repo: IReviewRepository) =>
  (params: ReviewListParams = {}) =>
    repo.list(params);
