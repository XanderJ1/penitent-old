<script lang="ts">
  import HomePage from '#lib/features/editorial/components/HomePage.svelte';
  let { data } = $props();
</script>

<HomePage {data} />
