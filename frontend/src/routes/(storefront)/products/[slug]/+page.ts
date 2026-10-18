import { catalogueService } from '#lib/features/catalogue/services/catalogue.service.ts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
export const load: PageLoad = async ({ params }) => {
  try {
    return { product: await catalogueService.getProduct(params.slug) };
  } catch (e) {
    error((e as { status?: number }).status || 503, (e as Error).message);
  }
};
