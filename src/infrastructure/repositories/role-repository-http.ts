import { apiDelete, apiGet, apiPatch, apiPost } from '@/infrastructure/http';
import type { ApiData, ApiMessage } from '@/infrastructure/http';
import type { CreateRoleInput, IRoleRepository, Role, UpdateRoleInput } from '@/domain';

export const roleRepositoryHttp: IRoleRepository = {
  async list() {
    return (await apiGet<ApiData<Role[]>>('/roles')).data;
  },
  async create(input: CreateRoleInput) {
    return (await apiPost<ApiData<Role>>('/roles', input)).data;
  },
  async update(id, input: UpdateRoleInput) {
    return (await apiPatch<ApiData<Role>>(`/roles/${id}`, input)).data;
  },
  async delete(id) {
    await apiDelete<ApiMessage>(`/roles/${id}`);
  },
};
