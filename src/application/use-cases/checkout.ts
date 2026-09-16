import type { CheckoutInput, ICartRepository } from '@/domain';
export const createCheckout = (repo: ICartRepository) => (input: CheckoutInput) =>
  repo.checkout(input);
