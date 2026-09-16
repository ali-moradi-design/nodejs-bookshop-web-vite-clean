import type { IBookRepository } from '@/domain';
export const createGetBook = (repo: IBookRepository) => (id: string) => repo.getById(id);
