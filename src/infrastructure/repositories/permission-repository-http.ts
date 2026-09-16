import { apiDelete, apiGet, apiPatch, apiPost } from '@/infrastructure/http';
import type { ApiData, ApiMessage } from '@/infrastructure/http';
import type {
  CreatePermissionInput,
  IPermissionRepository,
  Permission,
  UpdatePermissionInput,
} from '@/domain';

export const permissionRepositoryHttp: IPermissionRepository = {
  async list() {
    return (await apiGet<ApiData<Permission[]>>('/permissions')).data;
  },
  async create(input: CreatePermissionInput) {
    return (await apiPost<ApiData<Permission>>('/permissions', input)).data;
  },
  async update(id, input: UpdatePermissionInput) {
    return (await apiPatch<ApiData<Permission>>(`/permissions/${id}`, input)).data;
  },
  async delete(id) {
    await apiDelete<ApiMessage>(`/permissions/${id}`);
  },
};
