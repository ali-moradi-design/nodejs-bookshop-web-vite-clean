import { apiDelete, apiGet, apiPatch, apiPost } from '@/infrastructure/http';
import type { ApiData, ApiMessage, ApiPaginated } from '@/infrastructure/http';
import type {
  CreateReviewInput,
  IReviewRepository,
  Review,
  ReviewListParams,
  UpdateReviewInput,
} from '@/domain';

export const reviewRepositoryHttp: IReviewRepository = {
  async list(params: ReviewListParams = {}) {
    const res = await apiGet<ApiPaginated<Review> | ApiData<Review[]>>('/reviews', {
      ...params,
      limit: params.limit ?? 100,
    } as Record<string, string | number | undefined>);
    return Array.isArray((res as { data: unknown }).data) ? (res as { data: Review[] }).data : [];
  },
  async create(input: CreateReviewInput) {
    return (await apiPost<ApiData<Review>>('/reviews', input)).data;
  },
  async update(id, input: UpdateReviewInput) {
    return (await apiPatch<ApiData<Review>>(`/reviews/${id}`, input)).data;
  },
  async delete(id) {
    await apiDelete<ApiMessage>(`/reviews/${id}`);
  },
};
