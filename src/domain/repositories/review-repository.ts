import type { CreateReviewInput, Review, ReviewListParams, UpdateReviewInput } from '../entities';

export interface IReviewRepository {
  list(params?: ReviewListParams): Promise<Review[]>;
  create(input: CreateReviewInput): Promise<Review>;
  update(id: string, input: UpdateReviewInput): Promise<Review>;
  delete(id: string): Promise<void>;
}
