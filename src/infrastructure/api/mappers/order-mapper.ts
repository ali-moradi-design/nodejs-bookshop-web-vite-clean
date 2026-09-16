import type { Order } from '@/domain';

export function mapOrderDto(dto: Order): Order {
  return {
    ...dto,
    subtotalAmount: Number(dto.subtotalAmount),
    discountAmount: Number(dto.discountAmount ?? 0),
    totalAmount: Number(dto.totalAmount),
    items: (dto.items ?? []).map((i) => ({
      ...i,
      price: Number(i.price),
      quantity: Number(i.quantity),
    })),
  };
}

export function mapOrdersDto(dtos: Order[]): Order[] {
  return dtos.map(mapOrderDto);
}
