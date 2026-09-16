import type { IAdminRepository } from '@/domain';
export const createGetDashboardSummary = (repo: IAdminRepository) => () =>
  repo.getDashboardSummary();
export const createGetRecentOrders = (repo: IAdminRepository) => (limit?: number) =>
  repo.getRecentOrders(limit);
export const createGetLowStock = (repo: IAdminRepository) => (threshold?: number) =>
  repo.getLowStock(threshold);
export const createGetRevenue = (repo: IAdminRepository) => (from?: string, to?: string) =>
  repo.getRevenue(from, to);
export const createGetOrdersByStatus = (repo: IAdminRepository) => () => repo.getOrdersByStatus();
export const createGetTopBooks = (repo: IAdminRepository) => (from?: string, to?: string) =>
  repo.getTopBooks(from, to);
export const createGetSalesByDate = (repo: IAdminRepository) => (from?: string, to?: string) =>
  repo.getSalesByDate(from, to);
