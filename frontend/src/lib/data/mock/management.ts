import type { Product } from '../../features/catalogue/types';
import type {
  ProductEdit,
  VariantEdit,
} from '../../features/product-management/types';
import { AppError } from '../../utils/errors';
import { writeStorage } from '../../utils/browser-storage';
import { catalogue, options, integer, copy, CATALOGUE } from './state';
function safeImage(url: string) {
  return (
    typeof url === 'string' &&
    (url.startsWith('/images/') || /^https:\/\//i.test(url))
  );
}
export function saveProduct(id: number | null, input: ProductEdit) {
  const products = catalogue();
  const opts = options();
  const category = opts.categories.find((c) => c.id === input.categoryId);
  if (
    !category ||
    !input.name?.trim() ||
    input.name.length > 160 ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug) ||
    !input.description?.trim() ||
    !input.material?.trim() ||
    !input.care?.trim()
  )
    throw new AppError(
      'Complete the product fields and use a lowercase hyphenated slug.',
    );
  integer(input.priceCents, 1, 100000000, 'Price in cents');
  if (products.some((p) => p.slug === input.slug && p.id !== id))
    throw new AppError('That product slug already exists.');
  if (
    !Array.isArray(input.images) ||
    input.images.length < 1 ||
    input.images.length > 8 ||
    input.images.some(
      (i) =>
        !safeImage(i.url) ||
        !i.alt?.trim() ||
        i.alt.length > 300 ||
        (i.colourId !== null && !opts.colours.some((c) => c.id === i.colourId)),
    )
  )
    throw new AppError(
      'Use local /images/ paths or HTTPS image URLs, valid colours, and descriptive alt text.',
    );
  if (
    !input.collectionIds.every((id) =>
      opts.collections.some((c) => c.id === id),
    )
  )
    throw new AppError('Choose valid collections.');
  const old = products.find((p) => p.id === id);
  if (id !== null && !old) throw new AppError('Product not found.', 404);
  const result: Product = {
    ...copy(input),
    name: input.name.trim(),
    id: id ?? Math.max(0, ...products.map((p) => p.id)) + 1,
    category: category.name,
    categorySlug: category.slug,
    variants: old?.variants ?? [],
  };
  writeStorage(
    CATALOGUE,
    old
      ? products.map((p) => (p.id === id ? result : p))
      : [...products, result],
  );
  return { id: result.id };
}
export function saveVariant(
  productId: number,
  id: number | null,
  input: VariantEdit,
) {
  const products = catalogue();
  const p = products.find((p) => p.id === productId);
  const opts = options();
  if (!p) throw new AppError('Product not found.', 404);
  const size = opts.sizes.find((s) => s.id === input.sizeId);
  const colour = opts.colours.find((c) => c.id === input.colourId);
  if (!size || !colour || !input.sku?.trim() || input.sku.length > 80)
    throw new AppError('Choose a size, colour, and SKU.');
  integer(input.stock, 0, 100000, 'Stock');
  if (
    products.some((p) =>
      p.variants.some((v) => v.sku === input.sku && v.id !== id),
    )
  )
    throw new AppError('That SKU already exists.');
  if (
    p.variants.some(
      (v) => v.sizeId === size.id && v.colourId === colour.id && v.id !== id,
    )
  )
    throw new AppError('That size and colour combination already exists.');
  const old = p.variants.find((v) => v.id === id);
  if (id !== null && !old) throw new AppError('Variant not found.', 404);
  if (old && old.version !== input.version)
    throw new AppError('Inventory changed. Reload the product and try again.');
  const variant = {
    id:
      id ??
      Math.max(0, ...products.flatMap((p) => p.variants.map((v) => v.id))) + 1,
    sku: input.sku.trim(),
    sizeId: size.id,
    size: size.name,
    colourId: colour.id,
    colour: colour.name,
    hex: colour.hex,
    stock: input.stock,
    version: (old?.version ?? 0) + 1,
  };
  p.variants = old
    ? p.variants.map((v) => (v.id === id ? variant : v))
    : [...p.variants, variant];
  writeStorage(CATALOGUE, products);
  return { id: variant.id };
}
