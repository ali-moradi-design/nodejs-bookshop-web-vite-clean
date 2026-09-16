import type { IAuthRepository } from '@/domain';
export const createLogin = (repo: IAuthRepository) => (email: string, password: string) =>
  repo.login(email, password);
