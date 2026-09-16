import { apiDelete, apiGet, apiPatch, apiPost } from '@/infrastructure/http';
import type { ApiData } from '@/infrastructure/http';
import type { Cart, CheckoutInput, ICartRepository, Order } from '@/domain';

export const cartRepositoryHttp: ICartRepository = {
  async getCart() {
    return (await apiGet<ApiData<Cart>>('/cart')).data;
  },
  async addItem(bookId, quantity) {
    return (await apiPost<ApiData<Cart>>('/cart/items', { bookId, quantity })).data;
  },
  async updateItem(bookId, quantity) {
    return (await apiPatch<ApiData<Cart>>(`/cart/items/${bookId}`, { quantity })).data;
  },
  async removeItem(bookId) {
    return (await apiDelete<ApiData<Cart>>(`/cart/items/${bookId}`)).data;
  },
  async clear() {
    return (await apiDelete<ApiData<Cart>>('/cart')).data;
  },
  async checkout(input: CheckoutInput) {
    return (await apiPost<ApiData<Order>>('/cart/checkout', input)).data;
  },
};
