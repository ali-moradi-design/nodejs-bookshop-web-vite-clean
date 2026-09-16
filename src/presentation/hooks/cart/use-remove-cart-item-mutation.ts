import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ApiError } from '@/shared/api';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { cartKeys } from '../query-keys';

export function useRemoveCartItemMutation(bookId: string) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { removeCartItem } = useDependencies();

  return useMutation({
    mutationFn: () => removeCartItem(bookId),
    onSuccess: () => void qc.invalidateQueries({ queryKey: cartKeys.all }),
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
