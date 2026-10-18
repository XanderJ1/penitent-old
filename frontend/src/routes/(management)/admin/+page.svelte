<script lang="ts">
  import ProductManager from '#lib/features/product-management/components/ProductManager.svelte';
  let { data } = $props();
</script>

<ProductManager {data} />
