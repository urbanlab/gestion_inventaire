<script>
  import { json } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import { env } from "$env/dynamic/public";

  import { LightSwitch } from "@skeletonlabs/skeleton";

  import "../app.css";
  import Nav from "$lib/components/Nav.svelte";
  import {
    getAuth,
    logged,
    login,
    logout,
    syncing,
    notification,
    currentItems,
    getItems,
    getCurrentBarcodes,
    getCurrentItems,
  } from "$lib/store";
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import Fa from "svelte-fa";
  import { faCircle } from "@fortawesome/free-solid-svg-icons";
  import Notification from "$lib/components/Notification.svelte";
  import { get } from "svelte/store";

  const itemRefreshTime = env.PUBLIC_REFRESH_INTERVAL; // in minutes

  let saveItems = true;
  let doNotsync = false;

  let firstUpdate = true;

  $: {
    // check if loclStorage is empty
    if ($currentItems.lastUpdate) {
      firstUpdate = false;
    }
  }

  let password = "";

  onMount(() => {
    getAuth();
    document.title = "Emprunt";
    if (!doNotsync) {
      // Set an interval for checking updates
      const intervalId = setInterval(refreshItemsFromNotion, 5000);
    }
    getCurrentBarcodes();
    getCurrentItems();
  });

  function refreshItemsFromNotion() {
    if ($currentItems.lastUpdate) {
      // check if last update is older than itemRefreshTime
      if (
        new Date($currentItems.lastUpdate).getTime() <
        new Date().getTime() - itemRefreshTime * 60 * 1000
      ) {
        $currentItems.lastUpdate = new Date().toISOString();
        doNotsync = true;
        let items = getItems();
        items.then((res) => {
          if (res) {
            $currentItems.data = res;
          }
        });
        doNotsync = false;
      }
    }
  }
</script>

<div class="hidden">
  <LightSwitch />
</div>
<div class="flex flex-col mt-10">
  {#if !$logged}
    <input type="text" placeholder="mot de passe" bind:value={password} />
    <button on:click={() => login(password)}>login</button>
  {/if}
  {#if $logged}
    <div class="flex justify-between p-4 fixed top-0 w-full bg-surface-200-700-token">
      <button on:click={() => logout()}>logout</button>
      <div class="flex items-center">
        <p class="mr-2">
          {$syncing ? "synchronisation en cours" : "aucune synchronisation"}
        </p>
        <div
          class={$syncing ? "text-orange-500 animate-pulse" : "text-green-500"}
        >
          <Fa icon={faCircle} />
        </div>
      </div>
    </div>
    {#if firstUpdate}
      <div class="relative">
        <h1>Mise en cache des items de la techshop</h1>
        <p>La première fois, cela peut prendre plusieurs minutes</p>
        <ProgressBar label="Progress Bar" value={undefined} />
      </div>
    {/if}
    <div class={firstUpdate ? "opacity-5" : ""}>
      <Notification />
      <div class="mb-12">
        <slot />
      </div>
      <Nav />
    </div>
  {/if}
</div>
