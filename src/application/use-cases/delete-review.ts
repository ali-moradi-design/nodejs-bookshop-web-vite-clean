import type { IReviewRepository } from '@/domain';
export const createDeleteReview = (repo: IReviewRepository) => (id: string) => repo.delete(id);
