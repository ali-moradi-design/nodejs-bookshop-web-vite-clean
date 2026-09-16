import { apiDelete, apiGet, apiPatch, apiPost, apiUpload } from '@/infrastructure/http';
import type { ApiData, ApiMessage, ApiPaginated } from '@/infrastructure/http';
import type {
  Book,
  BookListParams,
  CreateBookInput,
  IBookRepository,
  UpdateBookInput,
} from '@/domain';

export const bookRepositoryHttp: IBookRepository = {
  async list(params = {}) {
    return apiGet<ApiPaginated<Book>>(
      '/books',
      params as Record<string, string | number | boolean | undefined>,
    );
  },
  async getFeatured() {
    return (await apiGet<ApiData<Book[]>>('/books/featured')).data;
  },
  async getById(id) {
    return (await apiGet<ApiData<Book>>(`/books/${id}`)).data;
  },
  async create(input: CreateBookInput) {
    return (await apiPost<ApiData<Book>>('/books', input)).data;
  },
  async update(id, input: UpdateBookInput) {
    return (await apiPatch<ApiData<Book>>(`/books/${id}`, input)).data;
  },
  async delete(id) {
    await apiDelete<ApiMessage>(`/books/${id}`);
  },
  async uploadCover(file) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await apiUpload<{ url: string }>('/uploads/book-cover', fd);
    return res.url;
  },
};
