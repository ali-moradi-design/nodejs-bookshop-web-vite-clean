import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ApiError } from '@/shared/api';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { bookKeys } from '../query-keys';

export function useDeleteBookMutation() {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { deleteBook } = useDependencies();

  return useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: () => {
      toast.success('Book deleted');
      void qc.invalidateQueries({ queryKey: bookKeys.all });
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
