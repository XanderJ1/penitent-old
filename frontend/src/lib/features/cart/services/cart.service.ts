import { dataProvider } from '../../../data/provider';
export const cartService = {
  getCart: () => dataProvider.getCart(),
  addItem: (variantId: number, quantity = 1) =>
    dataProvider.addCartItem(variantId, quantity),
  setQuantity: (variantId: number, quantity: number) =>
    dataProvider.setCartQuantity(variantId, quantity),
  removeItem: (variantId: number) => dataProvider.removeCartItem(variantId),
};
