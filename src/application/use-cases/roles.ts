import type { CreateRoleInput, IRoleRepository, UpdateRoleInput } from '@/domain';
export const createGetRoles = (repo: IRoleRepository) => () => repo.list();
export const createCreateRole = (repo: IRoleRepository) => (input: CreateRoleInput) =>
  repo.create(input);
export const createUpdateRole = (repo: IRoleRepository) => (id: string, input: UpdateRoleInput) =>
  repo.update(id, input);
export const createDeleteRole = (repo: IRoleRepository) => (id: string) => repo.delete(id);
