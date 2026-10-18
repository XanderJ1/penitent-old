import type {
  Options,
  Product,
  ProductPage,
  ProductFilters,
} from '../features/catalogue/types';
import type { Cart } from '../features/cart/types';
import type {
  CheckoutPreview,
  CheckoutRequest,
} from '../features/checkout/types';
import type {
  ProductEdit,
  VariantEdit,
} from '../features/product-management/types';
import type { Campaign } from '../features/editorial/types';

// UI contracts, independent of GraphQL schema, HTTP routes, and database models.
export interface DataProvider {
  getOptions(): Promise<Options>;
  getProducts(filters?: ProductFilters): Promise<ProductPage>;
  getProduct(slug: string): Promise<Product>;
  getCampaigns(): Promise<Campaign[]>;
  getCart(): Promise<Cart>;
  addCartItem(variantId: number, quantity: number): Promise<Cart>;
  setCartQuantity(variantId: number, quantity: number): Promise<Cart>;
  removeCartItem(variantId: number): Promise<Cart>;
  previewCheckout(input: CheckoutRequest): Promise<CheckoutPreview>;
  getManagementProducts(): Promise<Product[]>;
  saveProduct(id: number | null, input: ProductEdit): Promise<{ id: number }>;
  saveVariant(
    productId: number,
    id: number | null,
    input: VariantEdit,
  ): Promise<{ id: number }>;
}
// Demo-only capabilities are deliberately outside the live backend contract.
export interface DemoControls {
  resetData(): Promise<void>;
}
