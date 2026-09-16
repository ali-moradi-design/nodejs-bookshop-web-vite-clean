import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import type { IssueStatus } from '@/domain';
import { ApiError } from '@/shared/api';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { reportKeys } from '../query-keys';

export function useUpdateIssueStatusMutation() {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { updateIssue } = useDependencies();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: IssueStatus }) =>
      updateIssue(id, { status }),
    onSuccess: () => {
      toast.success('Issue updated');
      void qc.invalidateQueries({ queryKey: reportKeys.issues() });
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
