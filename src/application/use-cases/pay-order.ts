import type { IOrderRepository } from '@/domain';
export const createPayOrder = (repo: IOrderRepository) => (id: string) => repo.pay(id);
