import type { CreatePermissionInput, Permission, UpdatePermissionInput } from '../entities';

export interface IPermissionRepository {
  list(): Promise<Permission[]>;
  create(input: CreatePermissionInput): Promise<Permission>;
  update(id: string, input: UpdatePermissionInput): Promise<Permission>;
  delete(id: string): Promise<void>;
}
