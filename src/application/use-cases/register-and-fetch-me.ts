import type { IAuthRepository, User } from '@/domain';

export const createRegisterAndFetchMe =
  (repo: IAuthRepository) =>
  async (input: { name: string; email: string; password: string }): Promise<User> => {
    const res = await repo.register(input);
    try {
      return await repo.fetchMe();
    } catch {
      return res.user;
    }
  };
