<script lang="ts">
  import ProductGrid from './ProductGrid.svelte';
  import ProductFilters from './ProductFilters.svelte';
  import type { Options, ProductPage } from '../types';
  import { page } from '$app/state';
  let {
    data,
  }: {
    data: {
      options: Options | null;
      catalogue: ProductPage | null;
      error: string | null;
    };
  } = $props();
  let options = $derived(data.options as Options | null);
  function pageUrl(n: number) {
    const q = new URLSearchParams(page.url.searchParams.toString());
    q.set('page', String(n));
    return '/shop?' + q;
  }
</script>

<svelte:head><title>Shop clothing — PENITENT</title></svelte:head>
<div class="page-heading">
  <p class="eyebrow">CHAPTER 01 / THE COLLECTION</p>
  <h1>Everyday, considered.</h1>
  <p>Distinctive pieces. Effortless silhouettes. Made to be lived in.</p>
</div>
<section class="section shop-section">
  <ProductFilters {options} />
  {#if data.error}<p role="alert">
      {data.error} <a href="/shop">Retry</a>
    </p>{:else if data.catalogue}
    <p class="result-count">{data.catalogue.total} considered pieces</p>
    <ProductGrid products={data.catalogue.items} />
    {#if !data.catalogue.total}<p>
        No pieces match your filters. <a href="/shop">Explore all clothing</a>.
      </p>{/if}
    <nav class="pagination" aria-label="Product pages">
      {#each Array(Math.ceil(data.catalogue.total / 8)) as _, i}<a
          href={pageUrl(i + 1)}
          aria-current={data.catalogue.page === i + 1 ? 'page' : undefined}
          >{i + 1}</a
        >{/each}
    </nav>
  {/if}
</section>
