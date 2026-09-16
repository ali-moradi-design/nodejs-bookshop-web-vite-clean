import type { IAuthRepository } from '@/domain';
export const createListUsers = (repo: IAuthRepository) => () => repo.listUsers();
