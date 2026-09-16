/** App router — composes layout shells and presentation pages. */
import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { StorefrontShell } from '@/app/layout';
import { PanelShell } from '@/app/layout';
import { AdminShell } from '@/app/layout';
import { Header } from '@/app/layout';
import { Footer } from '@/app/layout';
import { RequireAuth } from '@/presentation/components/auth/require-auth';
import { PageLoader } from '@/shared/ui';

const HomePage = lazy(() =>
  import('@/presentation/pages/HomePage').then((m) => ({ default: m.HomePage })),
);
const CatalogPage = lazy(() =>
  import('@/presentation/pages/CatalogPage').then((m) => ({ default: m.CatalogPage })),
);
const BookDetailPage = lazy(() =>
  import('@/presentation/pages/BookDetailPage').then((m) => ({ default: m.BookDetailPage })),
);
const CartPage = lazy(() =>
  import('@/presentation/pages/CartPage').then((m) => ({ default: m.CartPage })),
);
const CheckoutPage = lazy(() =>
  import('@/presentation/pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })),
);
const LoginPage = lazy(() =>
  import('@/presentation/pages/LoginPage').then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import('@/presentation/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })),
);
const DashboardPage = lazy(() =>
  import('@/presentation/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const ProfilePage = lazy(() =>
  import('@/presentation/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })),
);
const OrdersPage = lazy(() =>
  import('@/presentation/pages/OrdersPage').then((m) => ({ default: m.OrdersPage })),
);
const OrderDetailPage = lazy(() =>
  import('@/presentation/pages/OrderDetailPage').then((m) => ({ default: m.OrderDetailPage })),
);
const FavoritesPage = lazy(() =>
  import('@/presentation/pages/FavoritesPage').then((m) => ({ default: m.FavoritesPage })),
);
const MyReviewsPage = lazy(() =>
  import('@/presentation/pages/MyReviewsPage').then((m) => ({ default: m.MyReviewsPage })),
);
const ReportIssuePage = lazy(() =>
  import('@/presentation/pages/ReportIssuePage').then((m) => ({ default: m.ReportIssuePage })),
);
const AdminDashboardPage = lazy(() =>
  import('@/presentation/pages/AdminDashboardPage').then((m) => ({
    default: m.AdminDashboardPage,
  })),
);
const AdminBooksPage = lazy(() =>
  import('@/presentation/pages/AdminBooksPage').then((m) => ({ default: m.AdminBooksPage })),
);
const AdminOrdersPage = lazy(() =>
  import('@/presentation/pages/AdminOrdersPage').then((m) => ({ default: m.AdminOrdersPage })),
);
const AdminUsersPage = lazy(() =>
  import('@/presentation/pages/AdminUsersPage').then((m) => ({ default: m.AdminUsersPage })),
);
const AdminRolesPage = lazy(() =>
  import('@/presentation/pages/AdminRolesPage').then((m) => ({ default: m.AdminRolesPage })),
);
const AdminPermissionsPage = lazy(() =>
  import('@/presentation/pages/AdminPermissionsPage').then((m) => ({
    default: m.AdminPermissionsPage,
  })),
);
const AdminDiscountsPage = lazy(() =>
  import('@/presentation/pages/AdminDiscountsPage').then((m) => ({
    default: m.AdminDiscountsPage,
  })),
);
const AdminReportsPage = lazy(() =>
  import('@/presentation/pages/AdminReportsPage').then((m) => ({ default: m.AdminReportsPage })),
);
const AdminAnalyticsPage = lazy(() =>
  import('@/presentation/pages/AdminAnalyticsPage').then((m) => ({
    default: m.AdminAnalyticsPage,
  })),
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
