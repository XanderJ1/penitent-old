<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  let {
    children,
    class: className = '',
    ...attributes
  }: HTMLButtonAttributes & { children?: Snippet } = $props();
</script>

<button {...attributes} class={'button ' + className}
  >{@render children?.()}</button
>
