import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { permissionKeys } from '../query-keys';

export function usePermissionsQuery() {
  const { getPermissions } = useDependencies();
  return useQuery({
    queryKey: permissionKeys.list(),
    queryFn: () => getPermissions(),
  });
}
