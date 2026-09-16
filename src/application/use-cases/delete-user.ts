import type { IAuthRepository } from '@/domain';
export const createDeleteUser = (repo: IAuthRepository) => (id: string) => repo.deleteUser(id);
