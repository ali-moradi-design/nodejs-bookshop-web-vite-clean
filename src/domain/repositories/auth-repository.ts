import type { AuthResponse, UpdateUserInput, User, CreateUserInput } from '../entities';

export interface IAuthRepository {
  login(email: string, password: string): Promise<AuthResponse>;
  register(input: { name: string; email: string; password: string }): Promise<AuthResponse>;
  logout(): Promise<void>;
  refreshSession(): Promise<AuthResponse>;
  fetchMe(): Promise<User>;
  updateUser(id: string, input: UpdateUserInput): Promise<User>;
  listUsers(): Promise<User[]>;
  getUser(id: string): Promise<User>;
  createUser(input: CreateUserInput): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
