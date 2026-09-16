import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartKeys, clearCart } from '../api/cart-api';

export function useClearCartMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => clearCart(),
    onSuccess: () => void qc.invalidateQueries({ queryKey: cartKeys.all }),
  });
}
