import type { IAuthRepository } from '@/domain';
export const createFetchMe = (repo: IAuthRepository) => () => repo.fetchMe();
