import type { IOrderRepository } from '@/domain';
export const createGetOrder = (repo: IOrderRepository) => (id: string) => repo.getById(id);
