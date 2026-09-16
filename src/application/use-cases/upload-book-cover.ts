import type { IBookRepository } from '@/domain';
export const createUploadBookCover = (repo: IBookRepository) => (file: File) =>
  repo.uploadCover(file);
