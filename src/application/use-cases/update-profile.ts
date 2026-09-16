import type { IAuthRepository, UpdateUserInput, User } from '@/domain';
import { DomainError } from '@/domain';

export const createUpdateProfile =
  (repo: IAuthRepository) =>
  async (userId: string, input: UpdateUserInput): Promise<User> => {
    if (!userId) throw new DomainError('INVALID_USER', 'User id is required');
    if (input.email !== undefined && !input.email.includes('@')) {
      throw new DomainError('INVALID_EMAIL', 'Email looks invalid');
    }
    return repo.updateUser(userId, input);
  };
