import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { cartKeys } from '../query-keys';

export function useClearCartMutation() {
  const qc = useQueryClient();
  const { clearCart } = useDependencies();

  return useMutation({
    mutationFn: () => clearCart(),
    onSuccess: () => void qc.invalidateQueries({ queryKey: cartKeys.all }),
  });
}
