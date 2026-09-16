import type { CreateBookInput, IBookRepository } from '@/domain';
export const createCreateBook = (repo: IBookRepository) => (input: CreateBookInput) =>
  repo.create(input);
