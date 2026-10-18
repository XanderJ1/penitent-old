import { dataProvider } from '../../../data/provider';
import { plainInput } from '../../../utils/plain-input';
import type { CheckoutRequest } from '../types';
export const checkoutService = {
  preview: (input: CheckoutRequest) =>
    dataProvider.previewCheckout(plainInput(input)),
};
