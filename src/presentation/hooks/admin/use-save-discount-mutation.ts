import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import type { CreateDiscountInput } from '@/domain';
import { ApiError } from '@/shared/api';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { discountKeys } from '../query-keys';

type Options = { editingId?: string | null; onSuccess?: () => void };

export function useSaveDiscountMutation({ editingId = null, onSuccess }: Options = {}) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { createDiscount, updateDiscount } = useDependencies();

  return useMutation({
    mutationFn: (values: CreateDiscountInput) =>
      editingId ? updateDiscount(editingId, values) : createDiscount(values),
    onSuccess: () => {
      toast.success('Saved');
      onSuccess?.();
      void qc.invalidateQueries({ queryKey: discountKeys.all });
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
