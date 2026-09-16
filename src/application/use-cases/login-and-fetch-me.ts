import type { IAuthRepository, User } from '@/domain';

/** Login then prefer /users/me profile when available. */
export const createLoginAndFetchMe =
  (repo: IAuthRepository) =>
  async (email: string, password: string): Promise<User> => {
    const res = await repo.login(email, password);
    try {
      return await repo.fetchMe();
    } catch {
      return res.user;
    }
  };
