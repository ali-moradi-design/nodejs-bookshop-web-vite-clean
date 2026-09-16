import type { Book, CreateBookInput, IBookRepository, UpdateBookInput } from '@/domain';

export type SaveBookInput = CreateBookInput & { id?: string | null };

export const createSaveBook =
  (repo: IBookRepository) =>
  async (input: SaveBookInput): Promise<Book> => {
    const { id, ...payload } = input;
    if (id) return repo.update(id, payload as UpdateBookInput);
    return repo.create(payload);
  };
