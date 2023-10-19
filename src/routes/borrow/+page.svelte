<script lang="ts">
  import Basket from "$lib/components/Basket.svelte";
  import { onMount } from "svelte";
  import { currentItems } from "$lib/store";

  let currentBarcode = "";

  onMount(async () => {
    document.title = "Emprunt";
  });
</script>

<section>
  {#if $currentItems}
    <Basket items={$currentItems.data} {currentBarcode} />
  {:else}
    Loading ...
  {/if}
</section>
