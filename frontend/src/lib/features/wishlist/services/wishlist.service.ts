import { catalogueService } from '../../catalogue/services/catalogue.service';
export const wishlistService = {
  getProducts: (slugs: string[]) =>
    Promise.all(slugs.map((slug) => catalogueService.getProduct(slug))),
};
