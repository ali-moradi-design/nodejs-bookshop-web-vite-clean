import type { Cart, CheckoutInput, Order } from '../entities';

export interface ICartRepository {
  getCart(): Promise<Cart>;
  addItem(bookId: string, quantity: number): Promise<Cart>;
  updateItem(bookId: string, quantity: number): Promise<Cart>;
  removeItem(bookId: string): Promise<Cart>;
  clear(): Promise<Cart>;
  checkout(input: CheckoutInput): Promise<Order>;
}
