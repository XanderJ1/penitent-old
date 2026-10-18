import type { Cart } from '../cart/types';
export type Address = {
  name: string;
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};
export type CheckoutRequest = {
  email: string;
  phone: string;
  delivery: Address;
  billingSameAsDelivery: boolean;
  billing: Address | null;
  packaging: string;
  giftMessage: string | null;
};
export type CheckoutPreview = {
  message: string;
  cart: Cart;
  totalCents: number;
  packaging: string;
  giftMessage: string | null;
};
