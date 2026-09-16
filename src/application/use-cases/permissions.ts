import type { CreatePermissionInput, IPermissionRepository, UpdatePermissionInput } from '@/domain';
export const createGetPermissions = (repo: IPermissionRepository) => () => repo.list();
export const createCreatePermission =
  (repo: IPermissionRepository) => (input: CreatePermissionInput) =>
    repo.create(input);
export const createUpdatePermission =
  (repo: IPermissionRepository) => (id: string, input: UpdatePermissionInput) =>
    repo.update(id, input);
export const createDeletePermission = (repo: IPermissionRepository) => (id: string) =>
  repo.delete(id);
