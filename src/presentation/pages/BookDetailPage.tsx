import { useParams } from 'react-router-dom';
import { BookDetailPanel } from '@/presentation/components/catalog/book-detail-panel';

export function BookDetailPage() {
  const params = useParams();
  const id = String(params?.id ?? '');
  return <BookDetailPanel bookId={id} />;
}
