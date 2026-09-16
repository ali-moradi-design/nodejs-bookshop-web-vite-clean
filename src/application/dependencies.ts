import type {
  AuthResponse,
  Book,
  BookListParams,
  Cart,
  CheckoutInput,
  CreateBookInput,
  CreateDiscountInput,
  CreateIssueInput,
  CreatePermissionInput,
  CreateReviewInput,
  CreateRoleInput,
  CreateUserInput,
  DashboardSummary,
  Discount,
  Favorite,
  IssueReport,
  Order,
  OrderStatus,
  OrdersByStatusItem,
  PaginatedResult,
  Permission,
  RecentBookSnapshot,
  RevenueSummary,
  Review,
  ReviewListParams,
  Role,
  SalesByDateItem,
  TopBookItem,
  UpdateBookInput,
  UpdateDiscountInput,
  UpdateIssueInput,
  UpdatePermissionInput,
  UpdateReviewInput,
  UpdateRoleInput,
  UpdateUserInput,
  User,
} from '@/domain';

/** Bound use-case facade exposed to presentation (no infrastructure types). */
export interface AppDependencies {
  login: (email: string, password: string) => Promise<AuthResponse>;
  loginAndFetchMe: (email: string, password: string) => Promise<User>;
  registerAndFetchMe: (input: { name: string; email: string; password: string }) => Promise<User>;
  register: (input: { name: string; email: string; password: string }) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<User>;
  updateUser: (id: string, input: UpdateUserInput) => Promise<User>;
  updateProfile: (userId: string, input: UpdateUserInput) => Promise<User>;
  listUsers: () => Promise<User[]>;
  getUser: (id: string) => Promise<User>;
  createUser: (input: CreateUserInput) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;

  getBooks: (params?: BookListParams) => Promise<PaginatedResult<Book>>;
  getFeaturedBooks: () => Promise<Book[]>;
  getBook: (id: string) => Promise<Book>;
  createBook: (input: CreateBookInput) => Promise<Book>;
  updateBook: (id: string, input: UpdateBookInput) => Promise<Book>;
  deleteBook: (id: string) => Promise<void>;
  uploadBookCover: (file: File) => Promise<string>;

  getCart: () => Promise<Cart>;
  addToCart: (bookId: string, quantity: number) => Promise<Cart>;
  updateCartItem: (bookId: string, quantity: number) => Promise<Cart>;
  removeCartItem: (bookId: string) => Promise<Cart>;
  clearCart: () => Promise<Cart>;
  checkout: (input: CheckoutInput) => Promise<Order>;

  getOrders: () => Promise<Order[]>;
  getOrder: (id: string) => Promise<Order>;
  payOrder: (id: string) => Promise<Order>;
  updateOrderStatus: (id: string, status: OrderStatus, note?: string) => Promise<Order>;

  getFavorites: () => Promise<Favorite[]>;
  addFavorite: (bookId: string) => Promise<Favorite>;
  removeFavorite: (bookId: string) => Promise<void>;
  toggleFavorite: (bookId: string, isFavorite: boolean) => Promise<void>;

  getReviews: (params?: ReviewListParams) => Promise<Review[]>;
  createReview: (input: CreateReviewInput) => Promise<Review>;
  submitReview: (input: CreateReviewInput) => Promise<Review>;
  updateReview: (id: string, input: UpdateReviewInput) => Promise<Review>;
  deleteReview: (id: string) => Promise<void>;

  getIssues: () => Promise<IssueReport[]>;
  createIssue: (input: CreateIssueInput) => Promise<IssueReport>;
  updateIssue: (id: string, input: UpdateIssueInput) => Promise<IssueReport>;
  deleteIssue: (id: string) => Promise<void>;

  getDiscounts: () => Promise<Discount[]>;
  createDiscount: (input: CreateDiscountInput) => Promise<Discount>;
  updateDiscount: (id: string, input: UpdateDiscountInput) => Promise<Discount>;
  deleteDiscount: (id: string) => Promise<void>;
  getRoles: () => Promise<Role[]>;
  createRole: (input: CreateRoleInput) => Promise<Role>;
  updateRole: (id: string, input: UpdateRoleInput) => Promise<Role>;
  deleteRole: (id: string) => Promise<void>;
  getPermissions: () => Promise<Permission[]>;
  createPermission: (input: CreatePermissionInput) => Promise<Permission>;
  updatePermission: (id: string, input: UpdatePermissionInput) => Promise<Permission>;
  deletePermission: (id: string) => Promise<void>;

  getDashboardSummary: () => Promise<DashboardSummary>;
  getRecentOrders: (limit?: number) => Promise<Order[]>;
  getLowStock: (threshold?: number) => Promise<Book[]>;
  getRevenue: (from?: string, to?: string) => Promise<RevenueSummary>;
  getOrdersByStatus: () => Promise<OrdersByStatusItem[]>;
  getTopBooks: (from?: string, to?: string) => Promise<TopBookItem[]>;
  getSalesByDate: (from?: string, to?: string) => Promise<SalesByDateItem[]>;

  readRecentlyViewed: () => RecentBookSnapshot[];
  listRecentlyViewedBooks: (excludeId?: string) => Book[];
  pushRecentlyViewed: (book: Omit<RecentBookSnapshot, 'viewedAt'>) => RecentBookSnapshot[];
}
