import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ApiError } from '@/shared/api';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { favoriteKeys } from '../query-keys';

export function useRemoveFavoriteMutation(bookId: string) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { removeFavorite } = useDependencies();

  return useMutation({
    mutationFn: () => removeFavorite(bookId),
    onSuccess: () => void qc.invalidateQueries({ queryKey: favoriteKeys.all }),
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
