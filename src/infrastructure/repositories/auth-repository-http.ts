import { mapUserDto } from '@/infrastructure/api/mappers';
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
  async login(email, password) {
    const res = await apiPost<AuthResponse>(
      '/auth/login',
      { email, password },
      { skipRefresh: true },
    );
    return { ...res, user: mapUserDto(res.user) };
  },
  async register(input) {
    const res = await apiPost<AuthResponse>('/auth/register', input, { skipRefresh: true });
    return { ...res, user: mapUserDto(res.user) };
  },
  async logout() {
    await apiPost<{ message: string }>('/auth/logout', {}, { skipRefresh: true });
  },
  refreshSession: () => apiPost<AuthResponse>('/auth/refresh', {}, { skipRefresh: true }),
  async fetchMe() {
    return mapUserDto((await apiGet<ApiData<User>>('/users/me')).data);
  },
  async updateUser(id, input: UpdateUserInput) {
    return mapUserDto((await apiPatch<ApiData<User>>(`/users/${id}`, input)).data);
  },
  async listUsers() {
    return (await apiGet<ApiData<User[]>>('/users')).data.map(mapUserDto);
  },
  async getUser(id) {
    return mapUserDto((await apiGet<ApiData<User>>(`/users/${id}`)).data);
  },
  async createUser(input: CreateUserInput) {
    return mapUserDto((await apiPost<ApiData<User>>('/users', input)).data);
  },
  async deleteUser(id) {
    await apiDelete<ApiMessage>(`/users/${id}`);
  },
};
