import { apiGet } from '@/infrastructure/http';
import type { ApiData } from '@/infrastructure/http';
import type {
  Book,
  DashboardSummary,
  IAdminRepository,
  Order,
  OrdersByStatusItem,
  RevenueSummary,
  SalesByDateItem,
  TopBookItem,
} from '@/domain';

export const adminRepositoryHttp: IAdminRepository = {
  async getDashboardSummary() {
    return (await apiGet<ApiData<DashboardSummary>>('/admin/dashboard/summary')).data;
  },
  async getRecentOrders(limit = 10) {
    return (await apiGet<ApiData<Order[]>>('/admin/dashboard/recent-orders', { limit })).data;
  },
  async getLowStock(threshold = 5) {
    return (await apiGet<ApiData<Book[]>>('/admin/dashboard/low-stock', { threshold })).data;
  },
  async getRevenue(from?, to?) {
    return (await apiGet<ApiData<RevenueSummary>>('/reports/analytics/revenue', { from, to })).data;
  },
  async getOrdersByStatus() {
    return (await apiGet<ApiData<OrdersByStatusItem[]>>('/reports/analytics/orders-by-status'))
      .data;
  },
  async getTopBooks(from?, to?) {
    return (await apiGet<ApiData<TopBookItem[]>>('/reports/analytics/top-books', { from, to }))
      .data;
  },
  async getSalesByDate(from?, to?) {
    return (
      await apiGet<ApiData<SalesByDateItem[]>>('/reports/analytics/sales-by-date', { from, to })
    ).data;
  },
};
