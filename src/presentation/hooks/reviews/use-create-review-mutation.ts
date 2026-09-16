import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ApiError } from '@/shared/api';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { reviewKeys } from '../query-keys';

type Options = { onSuccess?: () => void };

export function useCreateReviewMutation(bookId: string, options: Options = {}) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { submitReview } = useDependencies();
  const { onSuccess } = options;

  return useMutation({
    mutationFn: (values: { rating: number; comment?: string }) =>
      submitReview({ book: bookId, ...values }),
    onSuccess: () => {
      toast.success('Review submitted');
      onSuccess?.();
      void qc.invalidateQueries({ queryKey: reviewKeys.all });
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
