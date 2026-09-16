import type { BookListParams, ReviewListParams } from '@/domain';

export const bookKeys = {
  all: ['books'] as const,
  lists: () => [...bookKeys.all, 'list'] as const,
  list: (params: BookListParams) => [...bookKeys.lists(), params] as const,
  featured: () => [...bookKeys.all, 'featured'] as const,
  detail: (id: string) => [...bookKeys.all, 'detail', id] as const,
};

export const userKeys = {
  all: ['users'] as const,
  me: () => [...userKeys.all, 'me'] as const,
};

export const adminUserKeys = {
  all: ['users'] as const,
  list: () => [...adminUserKeys.all, 'list'] as const,
  detail: (id: string) => [...adminUserKeys.all, 'detail', id] as const,
};

export const cartKeys = {
  all: ['cart'] as const,
  current: () => [...cartKeys.all, 'current'] as const,
};

export const orderKeys = {
  all: ['orders'] as const,
  list: () => [...orderKeys.all, 'list'] as const,
  detail: (id: string) => [...orderKeys.all, 'detail', id] as const,
};

export const favoriteKeys = {
  all: ['favorites'] as const,
  list: () => [...favoriteKeys.all, 'list'] as const,
};

export const reviewKeys = {
  all: ['reviews'] as const,
  list: (params: ReviewListParams) => [...reviewKeys.all, 'list', params] as const,
  detail: (id: string) => [...reviewKeys.all, 'detail', id] as const,
};

export const reportKeys = {
  all: ['reports'] as const,
  issues: () => [...reportKeys.all, 'issues'] as const,
};

export const discountKeys = {
  all: ['discounts'] as const,
  list: () => [...discountKeys.all, 'list'] as const,
};

export const roleKeys = {
  all: ['roles'] as const,
  list: () => [...roleKeys.all, 'list'] as const,
};

export const permissionKeys = {
  all: ['permissions'] as const,
  list: () => [...permissionKeys.all, 'list'] as const,
};

export const adminKeys = {
  all: ['admin'] as const,
  summary: () => [...adminKeys.all, 'summary'] as const,
  recentOrders: (limit?: number) => [...adminKeys.all, 'recent-orders', limit] as const,
  lowStock: (threshold?: number) => [...adminKeys.all, 'low-stock', threshold] as const,
};

export const analyticsKeys = {
  all: ['analytics'] as const,
  revenue: (from?: string, to?: string) => [...analyticsKeys.all, 'revenue', from, to] as const,
  ordersByStatus: () => [...analyticsKeys.all, 'orders-by-status'] as const,
  topBooks: (from?: string, to?: string) => [...analyticsKeys.all, 'top-books', from, to] as const,
  salesByDate: (from?: string, to?: string) =>
    [...analyticsKeys.all, 'sales-by-date', from, to] as const,
};
