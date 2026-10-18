import { catalogueService } from '#lib/features/catalogue/services/catalogue.service.ts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
export const load: PageLoad = async ({ params, parent }) => {
  const { options } = await parent();
  const collection = options.collections.find((c) => c.slug === params.slug);
  if (!collection) error(404, 'Collection not found.');
  try {
    return {
      collection,
      products: (
        await catalogueService.getProducts({ collection: params.slug })
      ).items,
      unavailable: false,
    };
  } catch {
    return { collection, products: [], unavailable: true };
  }
};
