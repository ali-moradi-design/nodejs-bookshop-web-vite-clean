import type { AppDependencies } from '@/application';
import * as uc from '@/application/use-cases';
import {
  adminRepositoryHttp,
  authRepositoryHttp,
  bookRepositoryHttp,
  cartRepositoryHttp,
  discountRepositoryHttp,
  favoriteRepositoryHttp,
  orderRepositoryHttp,
  permissionRepositoryHttp,
  reportRepositoryHttp,
  reviewRepositoryHttp,
  roleRepositoryHttp,
} from '@/infrastructure/repositories';
import { recentlyViewedStorage } from '@/infrastructure/storage/recently-viewed-storage';

export function createDependencies(): AppDependencies {
  const books = bookRepositoryHttp;
  const auth = authRepositoryHttp;
  const cart = cartRepositoryHttp;
  const orders = orderRepositoryHttp;
  const favorites = favoriteRepositoryHttp;
  const reviews = reviewRepositoryHttp;
  const reports = reportRepositoryHttp;
  const discounts = discountRepositoryHttp;
  const roles = roleRepositoryHttp;
  const permissions = permissionRepositoryHttp;
  const admin = adminRepositoryHttp;
  const recent = recentlyViewedStorage;

  return {
    login: uc.createLogin(auth),
    register: uc.createRegister(auth),
    logout: uc.createLogout(auth),
    fetchMe: uc.createFetchMe(auth),
    updateUser: uc.createUpdateUser(auth),
    listUsers: uc.createListUsers(auth),
    getUser: uc.createGetUser(auth),
    createUser: uc.createCreateUser(auth),
    deleteUser: uc.createDeleteUser(auth),

    getBooks: uc.createGetBooks(books),
    getFeaturedBooks: uc.createGetFeaturedBooks(books),
    getBook: uc.createGetBook(books),
    createBook: uc.createCreateBook(books),
    updateBook: uc.createUpdateBook(books),
    deleteBook: uc.createDeleteBook(books),
    uploadBookCover: uc.createUploadBookCover(books),

    getCart: uc.createGetCart(cart),
    addToCart: uc.createAddToCart(cart),
    updateCartItem: uc.createUpdateCartItem(cart),
    removeCartItem: uc.createRemoveCartItem(cart),
    clearCart: uc.createClearCart(cart),
    checkout: uc.createCheckout(cart),

    getOrders: uc.createGetOrders(orders),
    getOrder: uc.createGetOrder(orders),
    payOrder: uc.createPayOrder(orders),
    updateOrderStatus: uc.createUpdateOrderStatus(orders),

    getFavorites: uc.createGetFavorites(favorites),
    addFavorite: uc.createAddFavorite(favorites),
    removeFavorite: uc.createRemoveFavorite(favorites),

    getReviews: uc.createGetReviews(reviews),
    createReview: uc.createCreateReview(reviews),
    updateReview: uc.createUpdateReview(reviews),
    deleteReview: uc.createDeleteReview(reviews),

    getIssues: uc.createGetIssues(reports),
    createIssue: uc.createCreateIssue(reports),
    updateIssue: uc.createUpdateIssue(reports),
    deleteIssue: uc.createDeleteIssue(reports),

    getDiscounts: uc.createGetDiscounts(discounts),
    createDiscount: uc.createCreateDiscount(discounts),
    updateDiscount: uc.createUpdateDiscount(discounts),
    deleteDiscount: uc.createDeleteDiscount(discounts),
    getRoles: uc.createGetRoles(roles),
    createRole: uc.createCreateRole(roles),
    updateRole: uc.createUpdateRole(roles),
    deleteRole: uc.createDeleteRole(roles),
    getPermissions: uc.createGetPermissions(permissions),
    createPermission: uc.createCreatePermission(permissions),
    updatePermission: uc.createUpdatePermission(permissions),
    deletePermission: uc.createDeletePermission(permissions),

    getDashboardSummary: uc.createGetDashboardSummary(admin),
    getRecentOrders: uc.createGetRecentOrders(admin),
    getLowStock: uc.createGetLowStock(admin),
    getRevenue: uc.createGetRevenue(admin),
    getOrdersByStatus: uc.createGetOrdersByStatus(admin),
    getTopBooks: uc.createGetTopBooks(admin),
    getSalesByDate: uc.createGetSalesByDate(admin),

    readRecentlyViewed: uc.createReadRecentlyViewed(recent),
    pushRecentlyViewed: uc.createPushRecentlyViewed(recent),
  };
}
