import type { CreateRoleInput, Role, UpdateRoleInput } from '../entities';

export interface IRoleRepository {
  list(): Promise<Role[]>;
  create(input: CreateRoleInput): Promise<Role>;
  update(id: string, input: UpdateRoleInput): Promise<Role>;
  delete(id: string): Promise<void>;
}
