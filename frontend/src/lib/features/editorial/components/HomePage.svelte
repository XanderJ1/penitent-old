<script lang="ts">
  import CampaignHero from './CampaignHero.svelte';
  import ProductGrid from '#lib/features/catalogue/components/ProductGrid.svelte';
  import type { Campaign } from '../types';
  import type { Product } from '#lib/features/catalogue/types.ts';
  let {
    data,
  }: {
    data: { products: Product[]; unavailable: boolean; campaigns: Campaign[] };
  } = $props();
  let columns = $derived(data.campaigns);
</script>

<CampaignHero />

<section class="editorial-hero" aria-labelledby="campaign-title">
  <div class="campaign-heading">
    <h2 id="campaign-title" tabindex="-1">PENITENT</h2>
    <p>Everyday clothing.<br />Extraordinary feeling.</p>
  </div>
  <div class="campaign-collage">
    {#each columns as column, index}
      <a
        class="campaign-column column-{index}"
        href={column.href}
        aria-label={column.label}
      >
        {#each column.images as photo, photoIndex}
          <div class="campaign-frame">
            <img
              src={photo.url}
              alt={photo.alt}
              width="600"
              height="800"
              loading={photoIndex === 0 ? 'eager' : 'lazy'}
              fetchpriority={index === 2 && photoIndex === 0 ? 'high' : 'auto'}
            />
            <span>{column.label} </span>
          </div>
        {/each}
      </a>
    {/each}
  </div>
  <div class="campaign-bottom">
    <span>CHAPTER 01 — BECOMING</span><a href="/shop"
      >Explore the collection </a
    ><span>EST. 2026 / CHAPTER 01</span>
  </div>
</section>

<section class="editorial-statement">
  <p class="eyebrow">A CHAPTER, NOT A CONCLUSION.</p>
  <h2>For everything<br />you are becoming.</h2>
  <div>
    <p>
      Considered streetwear. Distinctive details. Clothing that leaves room for
      you.
    </p>
    <a class="text-link" href="/story">The PENITENT perspective</a>
  </div>
</section>

<section class="section editorial-products">
  <div class="section-heading">
    <h2>The everyday edit</h2>
    <a class="text-link" href="/shop">All pieces</a>
  </div>
  {#if data.unavailable}
    <p role="alert">
      The collection is temporarily unavailable. <a href="/shop">Try again</a>.
    </p>
  {:else}
    <ProductGrid products={data.products} />
  {/if}
</section>

<section class="chapter-link">
  <span>01 / THE FIRST CHAPTER</span><a href="/collections/becoming"
    >Becoming.</a
  >
  <p>There is beauty in the unfinished.</p>
</section>
