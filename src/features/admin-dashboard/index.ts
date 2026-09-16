export type { DashboardSummary } from './model/types';
export {
  adminKeys,
  fetchDashboardSummary,
  fetchRecentOrders,
  fetchLowStock,
} from './api/admin-api';
export { useDashboardSummaryQuery } from './api/use-dashboard-summary-query';
export { useRecentOrdersQuery } from './api/use-recent-orders-query';
export { useLowStockQuery } from './api/use-low-stock-query';
export { AdminDashboardPage } from './ui/AdminDashboardPage';
export { AdminAnalyticsPage } from './ui/AdminAnalyticsPage';

export type {
  RevenueSummary,
  OrdersByStatusItem,
  TopBookItem,
  SalesByDateItem,
} from './model/analytics-types';
export {
  analyticsKeys,
  fetchRevenue,
  fetchOrdersByStatus,
  fetchTopBooks,
  fetchSalesByDate,
} from './api/analytics-api';
export { useRevenueQuery } from './api/use-revenue-query';
export { useOrdersByStatusQuery } from './api/use-orders-by-status-query';
export { useTopBooksQuery } from './api/use-top-books-query';
