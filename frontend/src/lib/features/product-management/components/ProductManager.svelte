<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '#lib/components/ui/Button.svelte';
  import type { Product, Options } from '#lib/features/catalogue/types.ts';
  import { money } from '#lib/utils/money.ts';
  import {
    managementService,
    demoManagement,
  } from '../services/management.service';
  let { data }: { data: { options: Options | null } } = $props();
  let options = $derived(data.options as Options | null);
  let error = $state('');
  let status = $state('');
  let busy = $state(false);
  let products = $state<Product[]>([]);
  let selected = $state<Product | null>(null);
  let edit = $state({
    name: '',
    slug: '',
    description: '',
    material: '',
    care: '',
    priceCents: 4500,
    categoryId: 1,
    published: false,
    collectionIds: [1],
    images: [{ url: '', alt: '', colourId: null as number | null }],
  });
  let variant = $state({
    id: null as number | null,
    sku: '',
    sizeId: 1,
    colourId: 1,
    stock: 0,
    version: null as number | null,
  });
  async function refresh() {
    products = await managementService.getProducts();
  }
  onMount(async () => {
    try {
      await refresh();
    } catch (e) {
      error = (e as Error).message;
    }
  });
  function choose(p: Product | null) {
    selected = p;
    error = '';
    status = '';
    edit = p
      ? {
          name: p.name,
          slug: p.slug,
          description: p.description,
          material: p.material,
          care: p.care,
          priceCents: p.priceCents,
          categoryId: p.categoryId,
          published: p.published,
          collectionIds: p.collectionIds,
          images: p.images.map((i) => ({
            url: i.url,
            alt: i.alt,
            colourId: i.colourId ?? null,
          })),
        }
      : {
          name: '',
          slug: '',
          description: '',
          material: '',
          care: '',
          priceCents: 4500,
          categoryId: options?.categories[0]?.id || 1,
          published: false,
          collectionIds: [],
          images: [{ url: '', alt: '', colourId: null }],
        };
    variant = {
      id: null,
      sku: '',
      sizeId: options?.sizes[0]?.id || 1,
      colourId: options?.colours[0]?.id || 1,
      stock: 0,
      version: null,
    };
  }
  async function save(e: SubmitEvent) {
    e.preventDefault();
    busy = true;
    error = '';
    try {
      const result = await managementService.saveProduct(
        selected?.id ?? null,
        edit,
      );
      await refresh();
      choose(products.find((p) => p.id === result.id) || null);
      status = 'Product saved.';
    } catch (e) {
      error = (e as Error).message;
    } finally {
      busy = false;
    }
  }
  function chooseVariant(id: number) {
    const v = selected?.variants.find((v) => v.id === id);
    if (v)
      variant = {
        id: v.id,
        sku: v.sku,
        sizeId: v.sizeId,
        colourId: v.colourId,
        stock: v.stock,
        version: v.version,
      };
  }
  async function saveVariant(e: SubmitEvent) {
    e.preventDefault();
    if (!selected) return;
    busy = true;
    error = '';
    try {
      const id = selected.id;
      await managementService.saveVariant(id, variant.id, variant);
      await refresh();
      choose(products.find((p) => p.id === id) || null);
      status = 'Variant and inventory saved.';
    } catch (e) {
      error = (e as Error).message;
    } finally {
      busy = false;
    }
  }
  async function resetDemo() {
    try {
      if (!demoManagement) return;
      await demoManagement.resetData();
      await refresh();
      choose(null);
      status = 'Demo catalogue and bag reset.';
    } catch (e) {
      error = (e as Error).message;
    }
  }
</script>

<svelte:head
  ><title>Product management — PENITENT</title><meta
    name="robots"
    content="noindex,nofollow"
  /></svelte:head
>
<div class="page-heading">
  <p class="eyebrow">PENITENT / DEMO STUDIO</p>
  <h1>Product management</h1>
</div>
<section class="section">
  {#if error}<p class="issue" role="alert">{error}</p>{/if}
  <p role="status">{status}</p>
  <div class="admin-banner">
    <p>
      Local demo editor — changes affect this browser only. No login or backend
      permissions are simulated.
    </p>
  </div>
  <div class="admin-toolbar">
    <button onclick={() => choose(null)}>New product</button><button
      onclick={resetDemo}>Reset demo data</button
    >
  </div>
  <div class="admin-layout">
    <aside class="admin-list">
      {#each products as p}<button
          class:selected={selected?.id === p.id}
          onclick={() => choose(p)}
          ><strong>{p.name}</strong><small
            >{money(p.priceCents)} · {p.published
              ? 'Published'
              : 'Archived / draft'}</small
          ></button
        >{/each}
    </aside>
    <div>
      <form class="checkout-form" onsubmit={save}>
        <h2>{selected ? 'Edit ' + selected.name : 'Create a product'}</h2>
        {#each [['name', 'Product name'], ['slug', 'Slug'], ['material', 'Material'], ['care', 'Care']] as [key, label]}<label
            >{label}<input
              bind:value={edit[key as 'name' | 'slug' | 'material' | 'care']}
              required
            /></label
          >{/each}
        <label
          >Description<textarea bind:value={edit.description} required rows="3"
          ></textarea></label
        >
        <label
          >Price (cents; $1 = 100 cents)<input
            type="number"
            min="1"
            max="100000000"
            bind:value={edit.priceCents}
            required
          /></label
        >
        <label
          >Category<select bind:value={edit.categoryId}
            >{#each options?.categories || [] as c}<option value={c.id}
                >{c.name}</option
              >{/each}</select
          ></label
        >
        <label class="check"
          ><input type="checkbox" bind:checked={edit.published} /> Published (uncheck
          to archive)</label
        >
        <fieldset>
          <legend>Collections</legend
          >{#each options?.collections || [] as c}<label class="check"
              ><input
                type="checkbox"
                value={c.id}
                bind:group={edit.collectionIds}
              />{c.name}</label
            >{/each}
        </fieldset>
        <h3>Images</h3>
        {#each edit.images as img, i}<div class="image-editor">
            <label
              >Image {i + 1} path or HTTPS URL<input
                type="text"
                bind:value={img.url}
                required
              /></label
            ><label
              >Alt text<input
                bind:value={img.alt}
                required
                maxlength="300"
              /></label
            ><label
              >Image colour<select bind:value={img.colourId}
                ><option value={null}>All colours</option
                >{#each options?.colours || [] as c}<option value={c.id}
                    >{c.name}</option
                  >{/each}</select
              ></label
            >{#if edit.images.length > 1}<button
                type="button"
                onclick={() =>
                  (edit.images = edit.images.filter((_, n) => n !== i))}
                >Remove image</button
              >{/if}
          </div>{/each}
        {#if edit.images.length < 8}<button
            type="button"
            onclick={() =>
              (edit.images = [
                ...edit.images,
                { url: '', alt: '', colourId: null },
              ])}>Add image</button
          >{/if}
        <Button disabled={busy}>Save product</Button>
      </form>
      {#if selected}<form
          class="checkout-form variant-form"
          onsubmit={saveVariant}
        >
          <h2>Variants & inventory</h2>
          <label
            >Choose variant<select
              value={variant.id || ''}
              onchange={(e) => {
                if (e.currentTarget.value)
                  chooseVariant(Number(e.currentTarget.value));
                else
                  variant = {
                    id: null,
                    sku: '',
                    sizeId: 1,
                    colourId: 1,
                    stock: 0,
                    version: null,
                  };
              }}
              ><option value="">New variant</option
              >{#each selected.variants as v}<option value={v.id}
                  >{v.sku} · {v.stock} in stock</option
                >{/each}</select
            ></label
          ><label
            >SKU<input
              bind:value={variant.sku}
              required
              maxlength="80"
            /></label
          ><label
            >Size<select bind:value={variant.sizeId}
              >{#each options?.sizes || [] as s}<option value={s.id}
                  >{s.name}</option
                >{/each}</select
            ></label
          ><label
            >Colour<select bind:value={variant.colourId}
              >{#each options?.colours || [] as c}<option value={c.id}
                  >{c.name}</option
                >{/each}</select
            ></label
          ><label
            >Stock<input
              type="number"
              min="0"
              max="100000"
              bind:value={variant.stock}
              required
            /></label
          ><Button disabled={busy}>Save variant</Button>
          <p class="muted">
            Conflicting inventory updates are rejected. Reload the product to
            get the current version.
          </p>
          <button
            type="button"
            onclick={async () => {
              const id = selected!.id;
              await refresh();
              choose(products.find((p) => p.id === id) || null);
            }}>Reload product</button
          >
        </form>{/if}
    </div>
  </div>
</section>
