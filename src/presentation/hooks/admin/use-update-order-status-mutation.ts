import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import type { OrderStatus } from '@/domain';
import { ApiError } from '@/shared/api';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { orderKeys } from '../query-keys';

export function useUpdateOrderStatusMutation() {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { updateOrderStatus } = useDependencies();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      updateOrderStatus(id, status),
    onSuccess: () => {
      toast.success('Status updated');
      void qc.invalidateQueries({ queryKey: orderKeys.all });
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
