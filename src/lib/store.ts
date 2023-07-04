import { writable } from "svelte/store";

export let itemsStore = writable([]);
export let itemsLastUpdateStore = writable(0);