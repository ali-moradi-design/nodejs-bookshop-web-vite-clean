import type { ShippingAddress } from './order';

export type { ShippingAddress };

export interface CartItem {
  bookId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  updatedAt: string;
  createdAt: string;
}

export interface CheckoutInput {
  shippingAddress: ShippingAddress;
  discountCode?: string;
}

export const cartItemCount = (cart: Cart | null | undefined): number =>
  cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

export const findCartItem = (cart: Cart | null | undefined, bookId: string) =>
  cart?.items.find((i) => i.bookId === bookId);
