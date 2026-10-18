import type { Product } from '../catalogue/types';
export type ProductEdit = Omit<
  Product,
  'id' | 'category' | 'categorySlug' | 'variants'
>;
export type VariantEdit = {
  id: number | null;
  sku: string;
  sizeId: number;
  colourId: number;
  stock: number;
  version: number | null;
};
