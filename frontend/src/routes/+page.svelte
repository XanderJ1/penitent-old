<script lang="ts">
  import ProductCard from '#lib/ProductCard.svelte';
  import type { Product } from '#lib/api.ts';
  let { data } = $props();
  const columns = [
    {
      label: 'Everyday / 01',
      href: '/shop?category=t-shirts',
      photos: [
        'photo-1503341504253-dff4815485f1',
        'photo-1521572163474-6864f9cf17ab',
      ],
      alt: 'Everyday cotton silhouettes',
    },
    {
      label: 'Quiet confidence',
      href: '/shop?category=hoodies',
      photos: [
        'photo-1556821840-3a63f95609a7',
        'photo-1578681994506-b8f463449011',
      ],
      alt: 'Relaxed hoodies and layering',
    },
    {
      label: 'Becoming / Chapter 01',
      href: '/collections/becoming',
      photos: [
        'photo-1503342217505-b0a15ec3261c',
        'photo-1523398002811-999ca8dec234',
      ],
      alt: 'Clothing with considered proportions',
    },
    {
      label: 'Room to move',
      href: '/shop?category=trousers',
      photos: [
        'photo-1473966968600-fa801b869a1a',
        'photo-1624378439575-d8705ad7ae80',
      ],
      alt: 'Wide trousers and everyday texture',
    },
    {
      label: 'The unfinished',
      href: '/story',
      photos: [
        'photo-1578681994506-b8f463449011',
        'photo-1503341504253-dff4815485f1',
      ],
      alt: 'The PENITENT perspective on everyday wear',
    },
  ];
</script>

<section class="editorial-hero" aria-labelledby="campaign-title">
  <div class="campaign-heading">
    <h1 id="campaign-title">PENITENT</h1>
    <p>Everyday clothing.<br />Extraordinary feeling.</p>
  </div>
  <div class="campaign-collage">
    {#each columns as column, index}
      <a
        class="campaign-column column-{index}"
        href={column.href}
        aria-label={column.label}
      >
        {#each column.photos as photo, photoIndex}
          <div class="campaign-frame">
            <img
              src={'https://images.unsplash.com/' +
                photo +
                '?auto=format&fit=crop&w=800&q=85'}
              alt={column.alt}
              width="600"
              height="800"
              loading={photoIndex === 0 ? 'eager' : 'lazy'}
              fetchpriority={index === 2 && photoIndex === 0 ? 'high' : 'auto'}
            />
            <span>{column.label} <span aria-hidden="true">↗</span></span>
          </div>
        {/each}
      </a>
    {/each}
  </div>
  <div class="campaign-bottom">
    <span>CHAPTER 01 — BECOMING</span><a href="/shop"
      >Explore the collection <span aria-hidden="true">↓</span></a
    ><span>INDIA / EST. 2026</span>
  </div>
</section>

<section class="editorial-statement">
  <p class="eyebrow">A CHAPTER, NOT A CONCLUSION.</p>
  <h2>For everything<br />you are becoming.</h2>
  <div>
    <p>
      Considered streetwear. Distinctive details. Clothing that leaves room for
      you.
    </p>
    <a class="text-link" href="/story">The PENITENT perspective ↗</a>
  </div>
</section>

<section class="section editorial-products">
  <div class="section-heading">
    <h2>The everyday edit</h2>
    <a class="text-link" href="/shop">All pieces ↗</a>
  </div>
  {#if data.unavailable}
    <p role="alert">
      The collection is temporarily unavailable. <a href="/shop">Try again</a>.
    </p>
  {:else}
    <div class="product-grid">
      {#each data.products as product}<ProductCard
          product={product as Product}
        />{/each}
    </div>
  {/if}
</section>

<section class="chapter-link">
  <span>01 / THE FIRST CHAPTER</span><a href="/collections/becoming"
    >Becoming.<span aria-hidden="true">↗</span></a
  >
  <p>There is beauty in the unfinished.</p>
</section>
