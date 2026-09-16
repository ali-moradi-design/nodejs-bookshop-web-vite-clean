import type { CreateUserInput, IAuthRepository } from '@/domain';
export const createCreateUser = (repo: IAuthRepository) => (input: CreateUserInput) =>
  repo.createUser(input);
