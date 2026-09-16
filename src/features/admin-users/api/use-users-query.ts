import { useQuery } from '@tanstack/react-query';
import { adminUserKeys, fetchUsers } from './users-api';

export function useUsersQuery() {
  return useQuery({
    queryKey: adminUserKeys.list(),
    queryFn: async () => (await fetchUsers()).data,
  });
}
