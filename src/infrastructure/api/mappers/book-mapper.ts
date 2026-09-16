import type { Book } from '@/domain';

/** Map API book payload → domain Book (identity today; centralize shaping). */
export function mapBookDto(dto: Book): Book {
  return {
    id: dto.id,
    title: dto.title,
    author: dto.author,
    description: dto.description ?? '',
    isbn: dto.isbn,
    price: Number(dto.price),
    currency: dto.currency || 'USD',
    stock: Number(dto.stock ?? 0),
    coverImageUrl: dto.coverImageUrl,
    categories: dto.categories,
    featured: Boolean(dto.featured),
    featuredOrder: dto.featuredOrder,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export function mapBooksDto(dtos: Book[]): Book[] {
  return dtos.map(mapBookDto);
}
