export type RecentBookSnapshot = {
  id: string;
  title: string;
  author: string;
  price: number;
  currency: string;
  coverImageUrl?: string;
  viewedAt: number;
};
