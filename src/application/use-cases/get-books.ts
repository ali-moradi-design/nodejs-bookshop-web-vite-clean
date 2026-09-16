import type { BookListParams, IBookRepository } from '@/domain';
export const createGetBooks =
  (repo: IBookRepository) =>
  (params: BookListParams = {}) =>
    repo.list(params);
