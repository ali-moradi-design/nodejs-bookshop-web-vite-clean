import type { IAuthRepository } from '@/domain';
export const createGetUser = (repo: IAuthRepository) => (id: string) => repo.getUser(id);
