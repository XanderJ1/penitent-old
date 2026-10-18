<script lang="ts">
  import '../app.css';
  import Header from '#lib/components/layout/Header.svelte';
  import Footer from '#lib/components/layout/Footer.svelte';
  import { onMount } from 'svelte';
  import { invalidateAll } from '$app/navigation';
  let { children } = $props();
  onMount(() => {
    const fallback = (event: Event) => {
      const image = event.target;
      if (image instanceof HTMLImageElement && !image.dataset.fallback) {
        image.dataset.fallback = 'true';
        image.src = '/images/placeholder.svg';
      }
    };
    const sync = (event: StorageEvent) => {
      if (event.key?.startsWith('penitent-demo-')) void invalidateAll();
    };
    document.addEventListener('error', fallback, true);
    window.addEventListener('storage', sync);
    return () => {
      document.removeEventListener('error', fallback, true);
      window.removeEventListener('storage', sync);
    };
  });
</script>

<svelte:head
  ><title>PENITENT — Clothing for becoming</title><meta
    name="description"
    content="Considered streetwear for everyday becoming. Discover PENITENT Chapter 01."
  /></svelte:head
>
<a class="skip" href="#main-content">Skip to content</a>
<Header />
<main id="main-content">{@render children()}</main>
<Footer />
