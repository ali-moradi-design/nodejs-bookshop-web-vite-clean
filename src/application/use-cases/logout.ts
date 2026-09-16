import type { IAuthRepository } from '@/domain';
export const createLogout = (repo: IAuthRepository) => () => repo.logout();
