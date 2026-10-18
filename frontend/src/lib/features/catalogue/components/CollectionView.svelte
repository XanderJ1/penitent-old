<script lang="ts">
  import ProductGrid from './ProductGrid.svelte';
  import type { Product, Options } from '../types';
  let {
    data,
  }: {
    data: {
      collection: Options['collections'][number];
      products: Product[];
      unavailable: boolean;
    };
  } = $props();
</script>

<div class="collection-heading">
  <p class="eyebrow">{data.collection.name}</p>
  <h1>For who you are.<br /><em>And who comes next.</em></h1>
  <p>{data.collection.story}</p>
</div>
<section class="section">
  {#if data.unavailable}<p role="alert">
      Unable to load this collection. Please refresh.
    </p>{:else}<ProductGrid products={data.products} />{/if}
</section>
