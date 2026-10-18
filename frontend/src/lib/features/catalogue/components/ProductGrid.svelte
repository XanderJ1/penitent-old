<script lang="ts">
  import ProductCard from './ProductCard.svelte';
  import type { Product } from '../types';
  let { products }: { products: Product[] } = $props();
</script>

<div class="product-grid">
  {#each products as product (product.id)}<ProductCard {product} />{/each}
</div>
