export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  isbn?: string;
  price: number;
  currency: string;
  stock: number;
  coverImageUrl?: string;
  categories?: string[];
  featured: boolean;
  featuredOrder?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  description: string;
  isbn?: string;
  price: number;
  currency?: string;
  stock?: number;
  coverImageUrl?: string;
  categories?: string[];
  featured?: boolean;
  featuredOrder?: number;
}

export type UpdateBookInput = Partial<CreateBookInput>;

export interface BookListParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  page?: number;
  limit?: number;
  sort?: 'price' | 'title' | 'createdAt';
  order?: 'asc' | 'desc';
}

/** Seed-aligned category list for catalog filters (nodejs-bookshop-layered). */
export const BOOK_CATEGORIES = [
  'algorithms',
  'architecture',
  'business',
  'c',
  'classics',
  'data',
  'ddd',
  'design-patterns',
  'devops',
  'dystopia',
  'fantasy',
  'fiction',
  'history',
  'horror',
  'java',
  'javascript',
  'management',
  'microservices',
  'nonfiction',
  'philosophy',
  'physics',
  'programming',
  'sci-fi',
  'science',
  'software',
  'sre',
  'young-adult',
] as const;

export type BookCategory = (typeof BOOK_CATEGORIES)[number];

/** Dual-range price slider bounds (seed max ≈ 90). */
export const BOOK_PRICE_MIN = 0;
export const BOOK_PRICE_MAX = 100;

export const isBookInStock = (book: Book | null | undefined): boolean =>
  Boolean(book && book.stock > 0);

export const bookPrimaryCategory = (book: Book | null | undefined): string | undefined =>
  book?.categories?.[0];
