import type { DataProvider, DemoControls } from '../contracts';
import seed from './catalogue.json';
import campaigns from './campaigns.json';
import { catalogue, options, copy, storedBag, CATALOGUE, BAG } from './state';
import { writeStorage } from '../../utils/browser-storage';
import { getProducts, getProduct } from './catalogue';
import { cart, changeBag } from './cart';
import { preview } from './checkout';
import { saveProduct, saveVariant } from './management';

export const jsonProvider: DataProvider = {
  async getOptions() {
    return options();
  },
  async getProducts(filters) {
    return getProducts(filters);
  },
  async getProduct(slug) {
    return getProduct(slug);
  },
  async getCampaigns() {
    return copy(campaigns);
  },
  async getCart() {
    return cart();
  },
  async addCartItem(id, quantity) {
    return changeBag(id, quantity, true);
  },
  async setCartQuantity(id, quantity) {
    return changeBag(id, quantity, false);
  },
  async removeCartItem(id) {
    writeStorage(
      BAG,
      storedBag().filter((line) => line.variantId !== id),
    );
    return cart();
  },
  async previewCheckout(input) {
    return preview(input);
  },
  async getManagementProducts() {
    return catalogue();
  },
  async saveProduct(id, input) {
    return saveProduct(id, input);
  },
  async saveVariant(productId, id, input) {
    return saveVariant(productId, id, input);
  },
};
export const jsonDemoControls: DemoControls = {
  async resetData() {
    writeStorage(CATALOGUE, seed.products);
    writeStorage(BAG, []);
  },
};
