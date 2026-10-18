export type CartLine = {
  variantId: number;
  name: string;
  slug: string;
  size: string;
  colour: string;
  image: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
  stock: number;
  issues: string[];
};
export type Cart = {
  items: CartLine[];
  subtotalCents: number;
  currency: string;
  canCheckout: boolean;
};
