<script lang="ts">
  let { onselect }: { onselect: () => void } = $props();
</script>

<nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation">
  {#each [['/shop', 'Shop all'], ['/shop?category=t-shirts', 'T-shirts'], ['/shop?category=hoodies', 'Hoodies'], ['/shop?category=trousers', 'Trousers'], ['/collections/becoming', 'Chapter 01'], ['/story', 'Our story']] as [href, label]}<a
      {href}
      onclick={onselect}>{label} </a
    >{/each}
</nav>
