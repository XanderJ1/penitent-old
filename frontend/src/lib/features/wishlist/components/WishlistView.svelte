<script lang="ts">
  import {
    wishlist,
    removeWish,
  } from '#lib/features/wishlist/wishlist.store.ts';
  import type { Product } from '#lib/features/catalogue/types.ts';
  import { wishlistService } from '../services/wishlist.service';
  import LoadingState from '#lib/components/ui/LoadingState.svelte';
  import EmptyState from '#lib/components/ui/EmptyState.svelte';
  import ProductGrid from '#lib/features/catalogue/components/ProductGrid.svelte';
  let products = $state<Product[]>([]);
  let error = $state('');
  let loading = $state(false);
  $effect(() => {
    const slugs = [...$wishlist];
    let cancelled = false;
    loading = true;
    wishlistService
      .getProducts(slugs)
      .then((p) => {
        if (!cancelled) {
          products = p;
          error = '';
        }
      })
      .catch(() => {
        if (!cancelled)
          error =
            'A saved piece may no longer be available. Remove it below or try again.';
      })
      .finally(() => {
        if (!cancelled) loading = false;
      });
    return () => {
      cancelled = true;
    };
  });
</script>

<div class="page-heading">
  <p class="eyebrow">KEPT CLOSE</p>
  <h1>Saved pieces</h1>
  <p>Saved on this browser, for when the moment feels right.</p>
</div>
<section class="section">
  {#if error}<p role="alert">{error}</p>
    {#each $wishlist as slug}<button onclick={() => removeWish(slug)}
        >Remove {slug}</button
      >{/each}{:else if loading}<LoadingState
      message="Finding your pieces…"
    />{:else if !$wishlist.length}<EmptyState
      message="No saved pieces yet."
      href="/shop"
      action="Explore the collection"
    />{:else}<ProductGrid {products} />{/if}
</section>
