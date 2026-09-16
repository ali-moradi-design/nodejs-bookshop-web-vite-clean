import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookCard } from '@/presentation/components/catalog/book-card';
import { FavoriteToggleButton } from '@/presentation/components/favorites/favorite-toggle-button';
import { useAuthStore } from '@/presentation/hooks/auth/auth-store';
import type { RecentBookSnapshot } from '@/domain';
import { useDependencies } from '@/presentation/providers/dependencies-provider';
import { snapshotToBook } from '@/presentation/lib/home/snapshot-to-book';

export function RecentlyViewedSection({ excludeId }: { excludeId?: string }) {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const { readRecentlyViewed } = useDependencies();
  const [items, setItems] = useState<RecentBookSnapshot[]>([]);

  useEffect(() => {
    setItems(readRecentlyViewed());
  }, []);

  const books = useMemo(
    () =>
      items
        .filter((s) => s.id !== excludeId)
        .map(snapshotToBook)
        .slice(0, 8),
    [items, excludeId],
  );

  if (books.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">{t('home.recentlyViewed')}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            actions={
              <FavoriteToggleButton bookId={book.id} compact isAuthenticated={Boolean(user)} />
            }
          />
        ))}
      </div>
    </section>
  );
}
