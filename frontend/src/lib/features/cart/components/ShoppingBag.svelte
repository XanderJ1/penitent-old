<script lang="ts">
  import { onMount } from 'svelte';
  import type { Cart } from '../types';
  import { cartService } from '../services/cart.service';
  import { money } from '#lib/utils/money.ts';
  import LoadingState from '#lib/components/ui/LoadingState.svelte';
  import EmptyState from '#lib/components/ui/EmptyState.svelte';
  let cart = $state<Cart | null>(null);
  let error = $state('');
  let busy = $state(false);
  async function load() {
    try {
      cart = await cartService.getCart();
      error = '';
    } catch (e) {
      error = (e as Error).message;
    }
  }
  onMount(load);
  async function change(id: number, n: number) {
    busy = true;
    try {
      cart =
        n === 0
          ? await cartService.removeItem(id)
          : await cartService.setQuantity(id, n);
      error = '';
    } catch (e) {
      const failure = (e as Error).message;
      await load();
      error = failure;
    } finally {
      busy = false;
    }
  }
</script>

<svelte:head><title>Your bag — PENITENT</title></svelte:head>
<div class="page-heading">
  <p class="eyebrow">YOUR CONSIDERED SELECTION</p>
  <h1>Shopping bag</h1>
</div>
<section class="section bag-layout">
  <div>
    {#if error}<p role="alert">
        {error} <button onclick={load}>Retry</button>
      </p>{/if}
    {#if !cart && !error}<LoadingState
        message="Loading your bag…"
      />{:else if cart?.items.length === 0}<EmptyState
        message="Your bag is waiting for its first piece."
        href="/shop"
        action="Explore the collection"
      />{:else if cart}
      {#each cart.items as item}<article class="bag-line">
          <a href={'/products/' + item.slug}
            ><img
              src={item.image}
              alt={item.name}
              width="180"
              height="225"
            /></a
          >
          <div>
            <h2><a href={'/products/' + item.slug}>{item.name}</a></h2>
            <p class="muted">{item.colour} / {item.size}</p>
            <p>{money(item.unitPriceCents)}</p>
            <label
              >Quantity <input
                aria-label={'Quantity for ' + item.name}
                type="number"
                min="1"
                max={Math.min(99, item.stock) || 1}
                value={item.quantity}
                disabled={busy}
                onchange={(e) =>
                  change(item.variantId, Number(e.currentTarget.value))}
              /></label
            ><button
              class="text-link"
              disabled={busy}
              onclick={() => change(item.variantId, 0)}>Remove</button
            >{#each item.issues as issue}<p class="issue">
                {issue}
              </p>{/each}{#if item.issues.some( (i) => i.startsWith('Price') )}<button
                onclick={() => change(item.variantId, item.quantity)}
                >Accept current price</button
              >{/if}
          </div>
          <strong>{money(item.lineTotalCents)}</strong>
        </article>{/each}
    {/if}
  </div>
  {#if cart?.items.length}<aside class="summary">
      <p class="eyebrow">THE DETAILS</p>
      <h2>Your selection</h2>
      <div class="summary-row">
        <span>Subtotal</span><span>{money(cart.subtotalCents)}</span>
      </div>
      <div class="summary-row">
        <span>Delivery</span><span>Complimentary</span>
      </div>
      <p class="muted">Tax included. Sample demo policies.</p>
      {#if cart.canCheckout}<a class="button full" href="/checkout"
          >Preview checkout</a
        >{:else}<p class="issue">
          Review the changes in your bag before continuing.
        </p>{/if}
      <p class="muted">
        Your bag does not reserve stock.<br />No payments or real orders.
      </p>
    </aside>{/if}
</section>
