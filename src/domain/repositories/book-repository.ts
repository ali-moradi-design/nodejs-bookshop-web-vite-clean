import type {
  Book,
  BookListParams,
  CreateBookInput,
  UpdateBookInput,
  PaginatedResult,
} from '../entities';

export interface IBookRepository {
  list(params?: BookListParams): Promise<PaginatedResult<Book>>;
  getFeatured(): Promise<Book[]>;
  getById(id: string): Promise<Book>;
  create(input: CreateBookInput): Promise<Book>;
  update(id: string, input: UpdateBookInput): Promise<Book>;
  delete(id: string): Promise<void>;
  uploadCover(file: File): Promise<string>;
}
