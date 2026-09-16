import type { ICartRepository } from '@/domain';
export const createGetCart = (repo: ICartRepository) => () => repo.getCart();
