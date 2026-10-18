import type {
  ProductFilters,
  ProductPage,
  Product,
} from '../../features/catalogue/types';
import { AppError } from '../../utils/errors';
import { catalogue, options } from './state';
export function getProducts(filters: ProductFilters = {}): ProductPage {
  let products = catalogue().filter((p) => p.published);
  const category = filters.category;
  const collection = options().collections.find(
    (c) => c.slug === filters.collection,
  );
  if (category) products = products.filter((p) => p.categorySlug === category);
  if (filters.collection)
    products = collection
      ? products.filter((p) => p.collectionIds.includes(collection.id))
      : [];
  if (filters.min)
    products = products.filter((p) => p.priceCents >= Number(filters.min));
  if (filters.max)
    products = products.filter((p) => p.priceCents <= Number(filters.max));
  if (filters.size || filters.colour)
    products = products.filter((p) =>
      p.variants.some(
        (v) =>
          (!filters.size || v.size === filters.size) &&
          (!filters.colour || v.colour === filters.colour) &&
          v.stock > 0,
      ),
    );
  if (filters.sort === 'price-asc')
    products.sort((a, b) => a.priceCents - b.priceCents);
  if (filters.sort === 'price-desc')
    products.sort((a, b) => b.priceCents - a.priceCents);
  if (filters.sort === 'name')
    products.sort((a, b) => a.name.localeCompare(b.name));
  const page = Math.max(1, Math.floor(Number(filters.page) || 1));
  const pageSize = Math.min(
    100,
    Math.max(1, Math.floor(Number(filters.pageSize) || 12)),
  );
  return {
    items: products.slice((page - 1) * pageSize, page * pageSize),
    total: products.length,
    page,
    pageSize,
  };
}
export function getProduct(slug: string): Product {
  const product = catalogue().find((p) => p.slug === slug && p.published);
  if (!product) throw new AppError('This piece could not be found.', 404);
  return product;
}
