import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { reportKeys } from '../query-keys';

export function useIssuesQuery() {
  const { getIssues } = useDependencies();
  return useQuery({
    queryKey: reportKeys.issues(),
    queryFn: () => getIssues(),
  });
}
