<script lang="ts">
  let { message = 'Loading…' }: { message?: string } = $props();
</script>

<p role="status">{message}</p>
