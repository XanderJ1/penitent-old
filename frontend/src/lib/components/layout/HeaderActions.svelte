<script lang="ts">
  import { wishlist } from '#lib/features/wishlist/wishlist.store.ts';
  import { catalogueService } from '#lib/features/catalogue/services/catalogue.service.ts';
  import type { Product } from '#lib/features/catalogue/types.ts';
  let searchDialog: HTMLDialogElement;
  let accountDialog: HTMLDialogElement;
  let query = $state('');
  let products = $state<Product[]>([]);
  let loading = $state(false);
  let error = $state('');
  const matches = $derived(products.filter(p => `${p.name} ${p.category}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6));
  async function search() {
    searchDialog.showModal();
    loading = true;
    error = '';
    try { products = (await catalogueService.getProducts({pageSize: 100})).items; }
    catch { error = 'Search is unavailable. Please try again.'; }
    finally { loading = false; }
  }
</script>

<nav aria-label="Shopping" class="header-actions">
  <button onclick={search} aria-label="Search" title="Search"><i class="bi bi-search" aria-hidden="true"></i></button>
  <a href="/wishlist" aria-label={`Favorites (${$wishlist.length})`} title="Favorites"><i class="bi bi-heart" aria-hidden="true"></i></a>
  <button onclick={() => accountDialog.showModal()} aria-label="Account" title="Account"><i class="bi bi-person" aria-hidden="true"></i></button>
  <a href="/bag" aria-label="Bag" title="Bag"><i class="bi bi-bag" aria-hidden="true"></i></a>
</nav>

<dialog bind:this={searchDialog} aria-labelledby="search-title">
  <div class="dialog-heading"><h2 id="search-title">Find your next piece.</h2><button aria-label="Close search" onclick={() => searchDialog.close()}><i class="bi bi-x-lg" aria-hidden="true"></i></button></div>
  <label for="site-search">Search clothing</label>
  <input id="site-search" type="search" bind:value={query} placeholder="Try hoodies, tees, trousers" />
  <div aria-live="polite">
    {#if loading}<p>Searching the collection…</p>
    {:else if error}<p role="alert">{error}</p>
    {:else if !matches.length}<p>No pieces found. Try another name.</p>
    {:else}{#each matches as product}<a class="search-result" href={`/products/${product.slug}`} onclick={() => searchDialog.close()}><img src={product.images[0]?.url} alt="" width="54" height="68" /><span>{product.name}<small>{product.category}</small></span></a>{/each}{/if}
  </div>
</dialog>
<dialog bind:this={accountDialog} aria-labelledby="account-title">
  <div class="dialog-heading"><h2 id="account-title">Your account</h2><button aria-label="Close account" onclick={() => accountDialog.close()}><i class="bi bi-x-lg" aria-hidden="true"></i></button></div>
  <p>Account sign-in is coming soon. You can save your favorites and shop as a guest.</p>
  <a class="account-link" href="/wishlist" onclick={() => accountDialog.close()}>View favorites</a>
</dialog>

<style>
  .header-actions { display:flex; align-items:center; justify-content:flex-end; gap:8px; }
  .header-actions :is(a, button) { display:inline-flex; align-items:center; justify-content:center; width:40px; min-height:44px; padding:0; border:0; color:inherit; font-size:19px; }
  .header-actions a:hover { text-decoration:none; }
  dialog { width:min(560px, calc(100% - 32px)); max-height:85svh; padding:28px; border:0; color:#111; background:#fff; }
  dialog::backdrop { background:#0009; backdrop-filter:blur(5px); }
  .dialog-heading { display:flex; justify-content:space-between; align-items:center; gap:16px; margin-bottom:24px; }
  h2 { font-size:28px; }
  .dialog-heading button { border:0; padding:10px; }
  label { display:block; font-size:12px; margin-bottom:8px; }
  input { width:100%; padding:14px; margin-bottom:20px; border:1px solid #aaa; }
  .search-result { display:flex; gap:16px; align-items:center; padding:12px 0; border-bottom:1px solid #ddd; }
  .search-result img { width:54px; height:68px; }
  .account-link { display:inline-block; margin-top:24px; border-bottom:1px solid; padding-block:10px; }
  @media(max-width:650px) { .header-actions { gap:0; } .header-actions :is(a,button) { width:32px; font-size:17px; } }
</style>
