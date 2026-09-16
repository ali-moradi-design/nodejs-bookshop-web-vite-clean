import type { IOrderRepository, OrderStatus } from '@/domain';
export const createUpdateOrderStatus =
  (repo: IOrderRepository) => (id: string, status: OrderStatus, note?: string) =>
    repo.updateStatus(id, status, note);
