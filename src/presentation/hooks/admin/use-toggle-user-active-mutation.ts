import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import type { User } from '@/domain';
import { ApiError } from '@/shared/api';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { adminUserKeys } from '../query-keys';

export function useToggleUserActiveMutation() {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { updateUser } = useDependencies();

  return useMutation({
    mutationFn: (user: User) => updateUser(user.id, { isActive: !user.isActive }),
    onSuccess: () => {
      toast.success('User updated');
      void qc.invalidateQueries({ queryKey: adminUserKeys.all });
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
