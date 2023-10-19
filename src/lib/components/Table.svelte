<script lang="ts">
  import { InputChip } from "@skeletonlabs/skeleton";
  import { currentBarcodes } from "../store";
  import Fa from "svelte-fa";
  import { faBasketShopping, faCheck } from "@fortawesome/free-solid-svg-icons";
  import type { Item } from "$lib/models/index";

  export let items: Array<Item>;

  function searchDesc(e) {
    items = JSON.parse(window.localStorage.getItem("items") || "[]").data;
    const input = e.target.value;

    // filter items.data.description with input
    items = items.filter((item) =>
      item?.descriptif
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(input.toLowerCase())
    );
  }

  function addCurrentBarcode(id_code_barre: string) {
    // add id_code_barre to currentBarcodes
    $currentBarcodes = [...$currentBarcodes, id_code_barre];
    // set currentBarcodes in localStorage
  }

  function removeCurrentBarcode(id_code_barre: string) {
    // remove id_code_barre from currentBarcodes
    $currentBarcodes = $currentBarcodes.filter(
      (barcode) => barcode !== id_code_barre
    );
  }
</script>

<section class="overflow-y-scroll">
  {#if items}
    <div class="card rounded-t-none rounded-b-none fixed w-full p-5">
      <h1 class="mb-7">Recherche</h1>
      <InputChip
        name="search"
        on:input={(e) => {
          searchDesc(e);
        }}
      />
    </div>
    <div class="table-container w-screen">
      <table class="table table-hover table-compact mt-36">
        <thead class="fixed h-20 w-full">
          <tr>
            <th>Panier</th>
            <th>desc</th>
            <th>projet</th>
            <th>utilisation</th>
            <th>quantité totale</th>
            <th>infos utiles</th>
          </tr>
        </thead>
        <tbody>
          <tr class="h-24" />
          {#each items.slice(0, 100) as item}
            <tr>
              <td>
                {#if $currentBarcodes.includes(item.id_code_barre)}
                  <button
                    class="btn bg-success-500 text-black"
                    on:click={() => {
                      removeCurrentBarcode(item.id_code_barre);
                    }}
                  >
                    <Fa icon={faCheck} />
                  </button>
                {:else if isNaN(item.id_code_barre)}{:else}
                  <button
                    class="btn bg-secondary-500"
                    on:click={() => {
                      addCurrentBarcode(item.id_code_barre);
                    }}
                  >
                    <Fa icon={faBasketShopping} />
                  </button>
                {/if}
              </td>
              <td>{item.descriptif}</td>
              <td>{item.projet}</td>
              <td>{item.utilisation}</td>
              <td>{item.quantite_totale}</td>
              <td>{item.infos_utiles}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <p>loading...</p>
  {/if}
</section>
