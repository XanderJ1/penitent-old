<script lang="ts">
  import { page } from '$app/state';
  import type { Options } from '../types';
  let { options }: { options: Options | null } = $props();
</script>

<form class="filters" method="GET" action="/shop">
  <label
    >Category<select
      name="category"
      value={page.url.searchParams.get('category') || ''}
      ><option value="">All clothing</option
      >{#each options?.categories || [] as c}<option value={c.slug}
          >{c.name}</option
        >{/each}</select
    ></label
  >
  <label
    >Size<select name="size" value={page.url.searchParams.get('size') || ''}
      ><option value="">All sizes</option
      >{#each options?.sizes || [] as s}<option>{s.name}</option>{/each}</select
    ></label
  >
  <label
    >Colour<select
      name="colour"
      value={page.url.searchParams.get('colour') || ''}
      ><option value="">All colours</option
      >{#each options?.colours || [] as c}<option>{c.name}</option
        >{/each}</select
    ></label
  >
  <label
    >Max price<select name="max" value={page.url.searchParams.get('max') || ''}
      ><option value="">Any price</option><option value="6000">$60</option
      ><option value="10000">$100</option><option value="15000">$150</option
      ></select
    ></label
  >
  <label
    >Sort<select name="sort" value={page.url.searchParams.get('sort') || ''}
      ><option value="">Collection order</option><option value="price-asc"
        >Price: low to high</option
      ><option value="price-desc">Price: high to low</option><option
        value="name">Name</option
      ></select
    ></label
  >
  <button class="button" type="submit">Apply</button><a href="/shop">Reset</a>
</form>
