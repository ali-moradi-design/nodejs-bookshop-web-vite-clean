import type { IBookRepository, UpdateBookInput } from '@/domain';
export const createUpdateBook = (repo: IBookRepository) => (id: string, input: UpdateBookInput) =>
  repo.update(id, input);
