import type { CreateReviewInput, IReviewRepository } from '@/domain';
export const createCreateReview = (repo: IReviewRepository) => (input: CreateReviewInput) =>
  repo.create(input);
