<script lang="ts">
  import CollectionView from '#lib/features/catalogue/components/CollectionView.svelte';
  let { data } = $props();
</script>

<CollectionView {data} />
