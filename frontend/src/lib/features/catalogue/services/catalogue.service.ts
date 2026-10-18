import { dataProvider } from '../../../data/provider';
import type { ProductFilters } from '../types';
export const catalogueService = {
  getOptions: () => dataProvider.getOptions(),
  getProducts: (filters: ProductFilters = {}) =>
    dataProvider.getProducts(filters),
  getProduct: (slug: string) => dataProvider.getProduct(slug),
};
export function filtersFromSearch(params: URLSearchParams): ProductFilters {
  const text = (key: string) => params.get(key) || undefined;
  const number = (key: string) => {
    const value = text(key);
    return value && Number.isFinite(Number(value)) ? Number(value) : undefined;
  };
  const sort = text('sort');
  return {
    category: text('category'),
    collection: text('collection'),
    size: text('size'),
    colour: text('colour'),
    min: number('min'),
    max: number('max'),
    page: number('page'),
    pageSize: number('pageSize'),
    sort:
      sort === 'name' || sort === 'price-asc' || sort === 'price-desc'
        ? sort
        : undefined,
  };
}
