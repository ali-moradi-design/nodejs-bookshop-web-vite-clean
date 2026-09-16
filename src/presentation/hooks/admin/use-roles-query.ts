import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { roleKeys } from '../query-keys';

export function useRolesQuery() {
  const { getRoles } = useDependencies();
  return useQuery({
    queryKey: roleKeys.list(),
    queryFn: () => getRoles(),
  });
}
