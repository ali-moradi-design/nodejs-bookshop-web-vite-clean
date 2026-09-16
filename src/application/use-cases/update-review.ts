import type { IReviewRepository, UpdateReviewInput } from '@/domain';
export const createUpdateReview =
  (repo: IReviewRepository) => (id: string, input: UpdateReviewInput) =>
    repo.update(id, input);
