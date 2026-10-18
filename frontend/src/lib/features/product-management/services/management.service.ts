import { dataProvider, demoControls } from '../../../data/provider';
import { plainInput } from '../../../utils/plain-input';
import type { ProductEdit, VariantEdit } from '../types';
export const managementService = {
  getProducts: () => dataProvider.getManagementProducts(),
  saveProduct: (id: number | null, input: ProductEdit) =>
    dataProvider.saveProduct(id, plainInput(input)),
  saveVariant: (productId: number, id: number | null, input: VariantEdit) =>
    dataProvider.saveVariant(productId, id, plainInput(input)),
};
// Demo reset is not an authentication or live administration API.
export const demoManagement = demoControls;
