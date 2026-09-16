import type { User } from '@/domain';

export function mapUserDto(dto: User): User {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    roles: dto.roles ?? [],
    isActive: dto.isActive !== false,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}
