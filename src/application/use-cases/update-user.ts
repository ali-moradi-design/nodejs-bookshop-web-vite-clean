import type { IAuthRepository, UpdateUserInput } from '@/domain';
export const createUpdateUser = (repo: IAuthRepository) => (id: string, input: UpdateUserInput) =>
  repo.updateUser(id, input);
