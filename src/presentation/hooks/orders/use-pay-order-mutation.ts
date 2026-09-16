import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ApiError } from '@/shared/api';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { orderKeys } from '../query-keys';

export function usePayOrderMutation(orderId: string) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { payOrder } = useDependencies();

  return useMutation({
    mutationFn: () => payOrder(orderId),
    onSuccess: () => {
      toast.success(t('panel.paymentSuccess'));
      void qc.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
      void qc.invalidateQueries({ queryKey: orderKeys.list() });
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
