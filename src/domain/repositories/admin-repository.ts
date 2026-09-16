import type {
  Book,
  DashboardSummary,
  Order,
  OrdersByStatusItem,
  RevenueSummary,
  SalesByDateItem,
  TopBookItem,
} from '../entities';

export interface IAdminRepository {
  getDashboardSummary(): Promise<DashboardSummary>;
  getRecentOrders(limit?: number): Promise<Order[]>;
  getLowStock(threshold?: number): Promise<Book[]>;
  getRevenue(from?: string, to?: string): Promise<RevenueSummary>;
  getOrdersByStatus(): Promise<OrdersByStatusItem[]>;
  getTopBooks(from?: string, to?: string): Promise<TopBookItem[]>;
  getSalesByDate(from?: string, to?: string): Promise<SalesByDateItem[]>;
}
