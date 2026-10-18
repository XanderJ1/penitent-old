import seed from './catalogue.json';
import type { Product, Options } from '../../features/catalogue/types';
import { AppError } from '../../utils/errors';
import { readStorage } from '../../utils/browser-storage';
export const CATALOGUE = 'penitent-demo-catalogue-v1';
export const BAG = 'penitent-demo-bag-v1';
type StoredLine = {
  variantId: number;
  quantity: number;
  acceptedPrice: number;
};
export const copy = <T>(value: T): T => structuredClone(value);
// Refresh the original placeholder photos without discarding saved stock or edits.
const originalPhotos = new Set([
  '1503341504253-dff4815485f1', '1521572163474-6864f9cf17ab',
  '1556821840-3a63f95609a7', '1578681994506-b8f463449011',
  '1503342217505-b0a15ec3261c', '1523398002811-999ca8dec234',
  '1473966968600-fa801b869a1a', '1624378439575-d8705ad7ae80',
].map(id => `/images/photo-${id}.jpg`));
export const catalogue = () =>
  readStorage<Product[]>(CATALOGUE, seed.products as Product[]).map(product => {
    const current = seed.products.find(p => p.id === product.id);
    return current && product.images.some(image => originalPhotos.has(image.url))
      ? { ...product, images: product.images.map((image, i) => originalPhotos.has(image.url)
        ? current.images[i % current.images.length] : image) }
      : product;
  });
export const options = () => copy(seed.options as Options);
export function integer(value: number, min: number, max: number, name: string) {
  if (!Number.isSafeInteger(value) || value < min || value > max)
    throw new AppError(`${name} must be a whole number from ${min} to ${max}.`);
}
export function findVariant(id: number) {
  const products = catalogue();
  const product = products.find((p) => p.variants.some((v) => v.id === id));
  const variant = product?.variants.find((v) => v.id === id);
  if (!product || !variant)
    throw new AppError('This variant is no longer available.', 404);
  return { product, variant };
}
export function storedBag() {
  const lines = readStorage<StoredLine[]>(BAG, []);
  if (!Array.isArray(lines))
    throw new AppError(
      'Invalid demo bag. Reset the demo data in the product editor.',
    );
  return lines;
}
