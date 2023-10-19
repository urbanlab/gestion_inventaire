<script lang="ts">
  import Table from "$lib/components/Table.svelte";
  import { onMount } from "svelte";
  import { currentItems } from "$lib/store";

  let currentBarcode = "";

  onMount(async () => {
    document.title = "Emprunt";
  });
</script>

<section>
  {#if $currentItems}
    <Table items={$currentItems.data} />
  {:else}
    Loading ...
  {/if}
</section>
