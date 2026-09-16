import { mapOrderDto, mapOrdersDto } from '@/infrastructure/api/mappers';
import { apiGet, apiPatch, apiPost } from '@/infrastructure/http';
import type { ApiData } from '@/infrastructure/http';
import type { IOrderRepository, Order, OrderStatus } from '@/domain';

export const orderRepositoryHttp: IOrderRepository = {
  async list() {
    return mapOrdersDto((await apiGet<ApiData<Order[]>>('/orders')).data);
  },
  async getById(id) {
    return mapOrderDto((await apiGet<ApiData<Order>>(`/orders/${id}`)).data);
  },
  async pay(id) {
    return mapOrderDto((await apiPost<ApiData<Order>>(`/orders/${id}/pay`)).data);
  },
  async updateStatus(id, status: OrderStatus, note?) {
    return mapOrderDto(
      (await apiPatch<ApiData<Order>>(`/orders/${id}/status`, { status, note })).data,
    );
  },
};
