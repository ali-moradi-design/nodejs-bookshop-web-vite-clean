import type { IBookRepository } from '@/domain';
export const createGetFeaturedBooks = (repo: IBookRepository) => () => repo.getFeatured();
