import type { IOrderRepository } from '@/domain';
export const createGetOrders = (repo: IOrderRepository) => () => repo.list();
