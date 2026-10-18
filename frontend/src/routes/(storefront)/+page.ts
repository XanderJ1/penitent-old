import { catalogueService } from '#lib/features/catalogue/services/catalogue.service.ts';
import { editorialService } from '#lib/features/editorial/services/editorial.service.ts';
import type { PageLoad } from './$types';
export const load: PageLoad = async () => {
  const campaigns = await editorialService.getCampaigns();
  try {
    return {
      campaigns,
      products: (await catalogueService.getProducts({ pageSize: 4 })).items,
      unavailable: false,
    };
  } catch {
    return { campaigns, products: [], unavailable: true };
  }
};
