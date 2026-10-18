<script lang="ts">
  let {
    message,
    href,
    action,
  }: { message: string; href?: string; action?: string } = $props();
</script>

<p>{message}</p>
{#if href && action}<a class="button" {href}>{action}</a>{/if}
