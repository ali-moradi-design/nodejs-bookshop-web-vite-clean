import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ApiError } from '@/shared/api';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { adminUserKeys } from '../query-keys';

export function useDeleteUserMutation() {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { deleteUser } = useDependencies();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted');
      void qc.invalidateQueries({ queryKey: adminUserKeys.all });
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
