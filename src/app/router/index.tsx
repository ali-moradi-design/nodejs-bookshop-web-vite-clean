import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { StorefrontShell } from '@/app/layout';
import { PanelShell } from '@/app/layout';
import { AdminShell } from '@/app/layout';
import { Header } from '@/app/layout';
import { Footer } from '@/app/layout';
import { RequireAuth } from '@/features/auth';
import { PageLoader } from '@/shared/ui';

const HomePage = lazy(() => import('@/features/home').then((m) => ({ default: m.HomePage })));
const CatalogPage = lazy(() =>
  import('@/features/catalog').then((m) => ({ default: m.CatalogPage })),
);
const BookDetailPage = lazy(() =>
  import('@/features/catalog').then((m) => ({ default: m.BookDetailPage })),
);
const CartPage = lazy(() => import('@/features/cart').then((m) => ({ default: m.CartPage })));
const CheckoutPage = lazy(() =>
  import('@/features/checkout').then((m) => ({ default: m.CheckoutPage })),
);
const LoginPage = lazy(() => import('@/features/auth').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() =>
  import('@/features/auth').then((m) => ({ default: m.RegisterPage })),
);
const DashboardPage = lazy(() =>
  import('@/features/profile').then((m) => ({ default: m.DashboardPage })),
);
const ProfilePage = lazy(() =>
  import('@/features/profile').then((m) => ({ default: m.ProfilePage })),
);
const OrdersPage = lazy(() => import('@/features/orders').then((m) => ({ default: m.OrdersPage })));
const OrderDetailPage = lazy(() =>
  import('@/features/orders').then((m) => ({ default: m.OrderDetailPage })),
);
const FavoritesPage = lazy(() =>
  import('@/features/favorites').then((m) => ({ default: m.FavoritesPage })),
);
const MyReviewsPage = lazy(() =>
  import('@/features/reviews').then((m) => ({ default: m.MyReviewsPage })),
);
const ReportIssuePage = lazy(() =>
  import('@/features/reports').then((m) => ({ default: m.ReportIssuePage })),
);
const AdminDashboardPage = lazy(() =>
  import('@/features/admin-dashboard').then((m) => ({ default: m.AdminDashboardPage })),
);
const AdminBooksPage = lazy(() =>
  import('@/features/admin-books').then((m) => ({ default: m.AdminBooksPage })),
);
const AdminOrdersPage = lazy(() =>
  import('@/features/admin-orders').then((m) => ({ default: m.AdminOrdersPage })),
);
const AdminUsersPage = lazy(() =>
  import('@/features/admin-users').then((m) => ({ default: m.AdminUsersPage })),
);
const AdminRolesPage = lazy(() =>
  import('@/features/admin-roles').then((m) => ({ default: m.AdminRolesPage })),
);
const AdminPermissionsPage = lazy(() =>
  import('@/features/admin-permissions').then((m) => ({ default: m.AdminPermissionsPage })),
);
const AdminDiscountsPage = lazy(() =>
  import('@/features/admin-discounts').then((m) => ({ default: m.AdminDiscountsPage })),
);
const AdminReportsPage = lazy(() =>
  import('@/features/admin-reports').then((m) => ({ default: m.AdminReportsPage })),
);
const AdminAnalyticsPage = lazy(() =>
  import('@/features/admin-dashboard').then((m) => ({ default: m.AdminAnalyticsPage })),
);

const RouteFallback = () => <PageLoader />;

const StorefrontLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <StorefrontShell>
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
    </StorefrontShell>
    <Footer />
  </div>
);

const PanelLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <RequireAuth>
      <PanelShell>
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </PanelShell>
    </RequireAuth>
  </div>
);

const AdminLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <RequireAuth requireAdmin>
      <AdminShell>
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </AdminShell>
    </RequireAuth>
  </div>
);

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Routes>
          <Route element={<StorefrontLayout />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="books/:id" element={<BookDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route path="panel" element={<PanelLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<OrderDetailPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="reviews" element={<MyReviewsPage />} />
            <Route path="report" element={<ReportIssuePage />} />
          </Route>

          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="books" element={<AdminBooksPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="roles" element={<AdminRolesPage />} />
            <Route path="permissions" element={<AdminPermissionsPage />} />
            <Route path="discounts" element={<AdminDiscountsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
}
