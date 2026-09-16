import { apiDelete, apiGet, apiPatch, apiPost } from '@/infrastructure/http';
import type { ApiData, ApiMessage } from '@/infrastructure/http';
import type {
  CreateDiscountInput,
  Discount,
  IDiscountRepository,
  UpdateDiscountInput,
} from '@/domain';

export const discountRepositoryHttp: IDiscountRepository = {
  async list() {
    return (await apiGet<ApiData<Discount[]>>('/discounts')).data;
  },
  async create(input: CreateDiscountInput) {
    return (await apiPost<ApiData<Discount>>('/discounts', input)).data;
  },
  async update(id, input: UpdateDiscountInput) {
    return (await apiPatch<ApiData<Discount>>(`/discounts/${id}`, input)).data;
  },
  async delete(id) {
    await apiDelete<ApiMessage>(`/discounts/${id}`);
  },
};
