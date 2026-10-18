import type {
  Address,
  CheckoutRequest,
  CheckoutPreview,
} from '../../features/checkout/types';
import { AppError } from '../../utils/errors';
import { cart } from './cart';
function addressValid(address: Address | null) {
  if (!address) return false;
  return ['name', 'line1', 'city', 'state', 'postalCode', 'country'].every(
    (key) => {
      const value = address[key as keyof Address];
      return (
        typeof value === 'string' &&
        value.trim().length > 0 &&
        value.length <= 160
      );
    },
  );
}
export function preview(body: CheckoutRequest): CheckoutPreview {
  const bag = cart();
  if (!bag.canCheckout)
    throw new AppError('Review your bag before continuing.');
  if (
    typeof body.email !== 'string' ||
    body.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) ||
    typeof body.phone !== 'string' ||
    !/^[+\d ()-]{7,25}$/.test(body.phone)
  )
    throw new AppError('Enter valid contact details.');
  if (
    !addressValid(body.delivery) ||
    (!body.billingSameAsDelivery && !addressValid(body.billing))
  )
    throw new AppError('Complete all delivery and billing fields.');
  if (
    !['standard', 'gift'].includes(body.packaging) ||
    (body.giftMessage?.length ?? 0) > 250
  )
    throw new AppError('Check packaging and gift message.');
  // Deliberately no address persistence, order creation, payment, or stock deduction.
  return {
    cart: bag,
    totalCents: bag.subtotalCents,
    packaging: body.packaging,
    giftMessage: body.giftMessage?.trim() || null,
    message:
      'No order has been placed. This is a browser-only demo preview; no payment has been collected.',
  };
}
