import type { CreateReviewInput, IReviewRepository, Review } from '@/domain';
import { DomainError } from '@/domain';

/** Validate rating then create review. */
export const createSubmitReview =
  (repo: IReviewRepository) =>
  async (input: CreateReviewInput): Promise<Review> => {
    if (!Number.isFinite(input.rating) || input.rating < 1 || input.rating > 5) {
      throw new DomainError('INVALID_RATING', 'Rating must be between 1 and 5');
    }
    if (!input.book) {
      throw new DomainError('INVALID_BOOK', 'Book id is required');
    }
    return repo.create(input);
  };
