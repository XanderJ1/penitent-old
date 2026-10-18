<script lang="ts">
  import { onMount } from 'svelte';
  import type { Cart } from '#lib/features/cart/types.ts';
  import { cartService } from '#lib/features/cart/services/cart.service.ts';
  import { checkoutService } from '../services/checkout.service';
  import { money } from '#lib/utils/money.ts';
  let cart = $state<Cart | null>(null);
  let error = $state('');
  let busy = $state(false);
  let preview = $state<{
    message: string;
    totalCents: number;
    packaging: string;
    giftMessage: string | null;
  } | null>(null);
  let email = $state('');
  let phone = $state('');
  let same = $state(true);
  let packaging = $state('standard');
  let gift = $state('');
  let delivery = $state({
    name: '',
    line1: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  let billing = $state({
    name: '',
    line1: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const fields = [
    ['name', 'Full name', 'name'],
    ['line1', 'Address', 'street-address'],
    ['city', 'City', 'address-level2'],
    ['state', 'State', 'address-level1'],
    ['postalCode', 'Postal code', 'postal-code'],
    ['country', 'Country', 'country-name'],
  ] as const;
  async function load() {
    try {
      cart = await cartService.getCart();
      error = '';
    } catch (e) {
      error = (e as Error).message;
    }
  }
  onMount(load);
  async function submit(e: SubmitEvent) {
    e.preventDefault();
    busy = true;
    error = '';
    preview = null;
    try {
      preview = await checkoutService.preview({
        email,
        phone,
        delivery,
        billingSameAsDelivery: same,
        billing: same ? null : billing,
        packaging,
        giftMessage: gift,
      });
    } catch (e) {
      error = (e as Error).message;
    } finally {
      busy = false;
    }
  }
</script>

<svelte:head><title>Checkout preview — PENITENT</title></svelte:head>
<div class="page-heading">
  <p class="eyebrow">A DEMO, WITH INTENTION</p>
  <h1>Checkout preview</h1>
  <p>No payment will be collected. No order will be placed.</p>
</div>
<section class="section bag-layout">
  {#if preview}<div class="confirmation" role="status">
      <p class="eyebrow">YOUR DEMO PREVIEW</p>
      <h2>Everything, considered.</h2>
      <p>{preview.message}</p>
      <p>Total: {money(preview.totalCents)}</p>
      <p>Packaging: {preview.packaging}</p>
      {#if preview.giftMessage}<p dir="auto">
          Gift message: {preview.giftMessage}
        </p>{/if}<a class="button" href="/shop">Back to the collection</a>
    </div>
  {:else}<form class="checkout-form" onsubmit={submit}>
      <h2>01 — Contact</h2>
      <label
        >Email<input
          type="email"
          bind:value={email}
          autocomplete="email"
          required
          maxlength="254"
        /></label
      ><label
        >Mobile number<input
          type="tel"
          bind:value={phone}
          autocomplete="tel"
          required
          placeholder="+1 555 010 0200"
        /></label
      >
      <h2>02 — Delivery</h2>
      {#each fields as [key, label, autocomplete]}<label
          >{label}<input
            bind:value={delivery[key]}
            {autocomplete}
            required
            maxlength="160"
          /></label
        >{/each}
      <p class="muted">
        Sample delivery details · Demo delivery is complimentary
      </p>
      <h2>03 — Billing</h2>
      <label class="check"
        ><input type="checkbox" bind:checked={same} /> Same as delivery address</label
      >{#if !same}{#each fields as [key, label, autocomplete]}<label
            >Billing {label}<input
              bind:value={billing[key]}
              {autocomplete}
              required
              maxlength="160"
            /></label
          >{/each}{/if}
      <h2>04 — A thoughtful finish</h2>
      <label
        >Packaging<select bind:value={packaging}
          ><option value="standard">Signature packaging — complimentary</option
          ><option value="gift">Gift packaging — complimentary</option></select
        ></label
      ><label
        >Gift message (optional)<textarea
          bind:value={gift}
          maxlength="250"
          rows="3"></textarea><span class="muted">{gift.length}/250</span
        ></label
      >
      {#if error}<p role="alert">{error}</p>{/if}<button
        class="button full"
        type="submit"
        disabled={busy}
        >{busy ? 'Checking your selection…' : 'Create demo preview'}</button
      >
      <p class="muted">
        Please use sample details. This browser-only preview does not save
        addresses.
      </p>
    </form>{/if}
  <aside class="summary">
    <h2>Order summary</h2>
    {#if cart}{#each cart.items as item}<div class="summary-row">
          <span
            >{item.name}<small
              >{item.size} / {item.colour} × {item.quantity}</small
            ></span
          ><span>{money(item.lineTotalCents)}</span>
        </div>{/each}
      <div class="summary-row total">
        <span>Total</span><span>{money(cart.subtotalCents)}</span>
      </div>
      {#if !cart.canCheckout}<p class="issue">
          Your bag needs attention. <a href="/bag">Review bag</a>.
        </p>{/if}{:else}<p>{error || 'Loading summary…'}</p>
      <button onclick={load}>Retry</button>{/if}
    <p class="muted">
      Prices include tax. Delivery and packaging are free demo policies.
    </p>
  </aside>
</section>
