<script lang="ts">
  import type { Product } from '../types';
  let {
    product,
    colour = $bindable(''),
    size = $bindable(''),
    onchange = () => {},
  }: {
    product: Product;
    colour?: string;
    size?: string;
    onchange?: () => void;
  } = $props();
  let selectedColour = $derived(colour || product.variants[0]?.colour || '');
  let colours = $derived([...new Set(product.variants.map((v) => v.colour))]);
  let sizes = $derived([...new Set(product.variants.map((v) => v.size))]);
</script>

<fieldset>
  <legend>Colour — {selectedColour}</legend>
  <div class="choices">
    {#each colours as c}<button
        class:selected={selectedColour === c}
        aria-pressed={selectedColour === c}
        onclick={() => {
          colour = c;
          size = '';
          onchange();
        }}
        ><span
          class="swatch"
          style:background={product.variants.find((v) => v.colour === c)?.hex}
        ></span>{c}</button
      >{/each}
  </div>
</fieldset>
<fieldset>
  <legend>Size</legend>
  <div class="choices">
    {#each sizes as s}{@const v = product.variants.find(
        (v) => v.colour === selectedColour && v.size === s,
      )}<button
        class:selected={size === s}
        disabled={!v || v.stock === 0}
        aria-pressed={size === s}
        onclick={() => {
          size = s;
          onchange();
        }}>{s}{v?.stock === 0 ? ' — sold out' : ''}</button
      >{/each}
  </div>
</fieldset>
