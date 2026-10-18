<script lang="ts">
  import ProductDetails from '#lib/features/catalogue/components/ProductDetails.svelte';
  let { data } = $props();
</script>

<ProductDetails {data} />
