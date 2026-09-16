import type { IAuthRepository } from '@/domain';
export const createRegister =
  (repo: IAuthRepository) => (input: { name: string; email: string; password: string }) =>
    repo.register(input);
