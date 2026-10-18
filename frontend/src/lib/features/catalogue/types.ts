export type Variant = {
  id: number;
  sku: string;
  sizeId: number;
  size: string;
  colourId: number;
  colour: string;
  hex: string;
  stock: number;
  version: number;
};
export type ProductImage = {
  url: string;
  alt: string;
  colourId: number | null;
};
export type Product = {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  category: string;
  categorySlug: string;
  collectionIds: number[];
  description: string;
  material: string;
  care: string;
  priceCents: number;
  published: boolean;
  images: ProductImage[];
  variants: Variant[];
};
export type Options = {
  categories: { id: number; name: string; slug: string }[];
  collections: { id: number; name: string; slug: string; story: string }[];
  sizes: { id: number; name: string; sortOrder: number }[];
  colours: { id: number; name: string; hex: string }[];
};
export type ProductPage = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductFilters = {
  category?: string;
  collection?: string;
  size?: string;
  colour?: string;
  min?: number;
  max?: number;
  sort?: 'price-asc' | 'price-desc' | 'name';
  page?: number;
  pageSize?: number;
};
