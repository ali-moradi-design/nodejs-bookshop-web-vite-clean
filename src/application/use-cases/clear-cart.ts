import type { ICartRepository } from '@/domain';
export const createClearCart = (repo: ICartRepository) => () => repo.clear();
