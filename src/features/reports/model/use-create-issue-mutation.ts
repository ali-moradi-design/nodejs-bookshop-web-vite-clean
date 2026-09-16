import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { createIssue } from '../api/report-api';
import { type CreateIssueInput } from './types';
import { ApiError } from '@/shared/api';

type Options = {
  onSuccess?: () => void;
};

export function useCreateIssueMutation(options: Options = {}) {
  const { t } = useTranslation();
  const { onSuccess } = options;

  return useMutation({
    mutationFn: (values: CreateIssueInput) => createIssue(values),
    onSuccess: () => {
      toast.success('Issue submitted');
      onSuccess?.();
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
