<script lang="ts">
  import ProductListing from '#lib/features/catalogue/components/ProductListing.svelte';
  let { data } = $props();
</script>

<ProductListing {data} />
