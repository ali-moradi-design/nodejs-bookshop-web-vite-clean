import type { Order, OrderStatus } from '../entities';

export interface IOrderRepository {
  list(): Promise<Order[]>;
  getById(id: string): Promise<Order>;
  pay(id: string): Promise<Order>;
  updateStatus(id: string, status: OrderStatus, note?: string): Promise<Order>;
}
