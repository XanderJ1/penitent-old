import type { Cart } from '../../features/cart/types';
import { AppError } from '../../utils/errors';
import { writeStorage } from '../../utils/browser-storage';
import { catalogue, integer, findVariant, storedBag, BAG } from './state';
export function cart(): Cart {
  const products = catalogue();
  const items = storedBag().map((line) => {
    integer(line.quantity, 1, 99, 'Quantity');
    const product = products.find((p) =>
      p.variants.some((v) => v.id === line.variantId),
    );
    const variant = product?.variants.find((v) => v.id === line.variantId);
    const issues: string[] = [];
    if (!product?.published || !variant)
      issues.push('This piece is no longer available. Remove it to continue.');
    if (variant && line.quantity > variant.stock)
      issues.push(
        'Stock has changed. Reduce the quantity or remove this piece.',
      );
    if (product && product.priceCents !== line.acceptedPrice)
      issues.push('Price has changed. Accept the current price to continue.');
    return {
      variantId: line.variantId,
      name: product?.name ?? 'Unavailable piece',
      slug: product?.slug ?? '',
      size: variant?.size ?? '',
      colour: variant?.colour ?? '',
      image: product?.images[0]?.url ?? '/images/placeholder.svg',
      quantity: line.quantity,
      unitPriceCents: product?.priceCents ?? 0,
      lineTotalCents: (product?.priceCents ?? 0) * line.quantity,
      stock: variant?.stock ?? 0,
      issues,
    };
  });
  return {
    items,
    subtotalCents: items.reduce((sum, item) => sum + item.lineTotalCents, 0),
    currency: 'USD',
    canCheckout: items.length > 0 && items.every((i) => !i.issues.length),
  };
}
export function changeBag(id: number, quantity: number, add: boolean) {
  const { product, variant } = findVariant(id);
  if (!product.published) throw new AppError('This piece is unavailable.');
  integer(quantity, 1, 99, 'Quantity');
  const lines = storedBag();
  const existing = lines.find((l) => l.variantId === id);
  const next = add ? (existing?.quantity ?? 0) + quantity : quantity;
  integer(next, 1, 99, 'Quantity');
  if (next > variant.stock)
    throw new AppError(
      `Only ${variant.stock} available in this size and colour.`,
    );
  if (existing) {
    existing.quantity = next;
    existing.acceptedPrice = product.priceCents;
  } else
    lines.push({
      variantId: id,
      quantity: next,
      acceptedPrice: product.priceCents,
    });
  writeStorage(BAG, lines);
  return cart();
}
