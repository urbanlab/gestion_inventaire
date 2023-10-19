<script>
  import { json } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import { env } from "$env/dynamic/public";

  import { LightSwitch } from "@skeletonlabs/skeleton";
  import { initializeStores } from "@skeletonlabs/skeleton";

  import "../app.css";
  import Nav from "$lib/components/Nav.svelte";
  import {
    getAuth,
    logged,
    login,
    logout,
    notification,
    getCurrentBarcodes,
  } from "$lib/store";
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import Fa from "svelte-fa";
  import { faCircle } from "@fortawesome/free-solid-svg-icons";
  import Notification from "$lib/components/Notification.svelte";

  let items;
  const itemRefreshTime = env.PUBLIC_REFRESH_INTERVAL; // in minutes

  let saveItems = true;
  const doNotsync = false;

  let syncing = false;
  let firstUpdate = true;

  $: {
    // check if loclStorage is empty
    if (items) {
      firstUpdate = false;
    }
  }

  let password = "";

  onMount(() => {
    getAuth();
    document.title = "Emprunt";
    if (doNotsync) {
      console.log("doNotsync");
      items = JSON.parse(window.localStorage.getItem("items"));
    } else {
      setLocalStorage();
    }
    getCurrentBarcodes();
    initializeStores();
  });

  async function fetchItems() {
    syncing = true;
    const response = await fetch("/api/items");
    const data = await response.json();
    console.log("data", data);
    if (data.error) {
      console.log("error", data.error);
      $notification = {
        type: "variant-filled-warning",
        body: data.error,
        show: true,
      };
      return items;
    } else {
      syncing = false;
      return data;
    }
  }

  function setLocalStorage() {
    const itemsLocalStorage = window.localStorage.getItem("items");
    setTimeout(async () => {
      if (itemsLocalStorage && saveItems == true) {
        // check if items.lastUpdate is older than 5 minutes
        items = JSON.parse(itemsLocalStorage);
        const now = new Date();
        const itemslastUpdate = new Date(items.lastUpdate);
        const diff = now.getTime() - itemslastUpdate.getTime();
        const diffMinutes = Math.round(((diff % 86400000) % 3600000) / 60000);
        console.log(diffMinutes);
        saveItems = false;
        if (diffMinutes > itemRefreshTime) {
          console.log(
            "items in localStorage but older than ",
            itemRefreshTime,
            " minutes"
          );
          // fetch api/items and save it in localStorage with items.data and itemslastUpdate
          // fetch('http://localhost:3000/api/items')

          const data = await fetchItems();
          items.data = data;
          items.lastUpdate = new Date().toString();
          window.localStorage.setItem("items", JSON.stringify(items));
        } else {
          console.log(
            "items in localStorage and younger than ",
            itemRefreshTime,
            " minutes"
          );
        }
      } else {
        console.log("no items in localStorage");
        // fetch api/items and save it in localStorage with items.data and itemslastUpdate

        const data = await fetchItems();
        items = {
          data: data,
          lastUpdate: new Date().toString(),
        };
        window.localStorage.setItem("items", JSON.stringify(items));
      }
      setLocalStorage();
    }, 5000);
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
    <div class="flex justify-between p-4 fixed top-0 w-full bg-surface-900">
      <button on:click={() => logout()}>logout</button>
      <div class="flex items-center">
        <p class="mr-2">
          {syncing ? "synchronisation en cours" : "aucune synchronisation"}
        </p>
        <div
          class={syncing ? "text-orange-500 animate-pulse" : "text-green-500"}
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
      <slot />
      <Nav />
    </div>
  {/if}
</div>
