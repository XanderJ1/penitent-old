import { catalogueService } from '#lib/features/catalogue/services/catalogue.service.ts';
import type { LayoutLoad } from './$types';
export const ssr = false;
export const load: LayoutLoad = async () => ({
  options: await catalogueService.getOptions(),
});
