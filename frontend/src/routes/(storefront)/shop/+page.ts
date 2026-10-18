import {
  catalogueService,
  filtersFromSearch,
} from '#lib/features/catalogue/services/catalogue.service.ts';
import type { PageLoad } from './$types';
export const load: PageLoad = async ({ url }) => {
  try {
    return {
      catalogue: await catalogueService.getProducts({
        ...filtersFromSearch(url.searchParams),
        pageSize: 8,
      }),
      error: null,
    };
  } catch (e) {
    return { catalogue: null, error: (e as Error).message };
  }
};
