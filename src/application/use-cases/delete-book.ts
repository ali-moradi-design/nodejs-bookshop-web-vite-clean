import type { IBookRepository } from '@/domain';
export const createDeleteBook = (repo: IBookRepository) => (id: string) => repo.delete(id);
