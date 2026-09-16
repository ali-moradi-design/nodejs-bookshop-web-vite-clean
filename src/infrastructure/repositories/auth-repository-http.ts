import { apiDelete, apiGet, apiPatch, apiPost } from '@/infrastructure/http';
import type { ApiData, ApiMessage } from '@/infrastructure/http';
import type {
  AuthResponse,
  CreateUserInput,
  IAuthRepository,
  UpdateUserInput,
  User,
} from '@/domain';

export const authRepositoryHttp: IAuthRepository = {
  login: (email, password) =>
    apiPost<AuthResponse>('/auth/login', { email, password }, { skipRefresh: true }),
  register: (input) => apiPost<AuthResponse>('/auth/register', input, { skipRefresh: true }),
  async logout() {
    await apiPost<{ message: string }>('/auth/logout', {}, { skipRefresh: true });
  },
  refreshSession: () => apiPost<AuthResponse>('/auth/refresh', {}, { skipRefresh: true }),
  async fetchMe() {
    return (await apiGet<ApiData<User>>('/users/me')).data;
  },
  async updateUser(id, input: UpdateUserInput) {
    return (await apiPatch<ApiData<User>>(`/users/${id}`, input)).data;
  },
  async listUsers() {
    return (await apiGet<ApiData<User[]>>('/users')).data;
  },
  async getUser(id) {
    return (await apiGet<ApiData<User>>(`/users/${id}`)).data;
  },
  async createUser(input: CreateUserInput) {
    return (await apiPost<ApiData<User>>('/users', input)).data;
  },
  async deleteUser(id) {
    await apiDelete<ApiMessage>(`/users/${id}`);
  },
};
