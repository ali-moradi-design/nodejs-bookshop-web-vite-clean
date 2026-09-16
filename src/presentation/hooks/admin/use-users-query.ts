import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { adminUserKeys } from '../query-keys';

export function useUsersQuery() {
  const { listUsers } = useDependencies();
  return useQuery({
    queryKey: adminUserKeys.list(),
    queryFn: () => listUsers(),
  });
}
