import { get, writable} from "svelte/store";
import type { Writable } from "svelte/store";
import { env } from '$env/dynamic/public';
import type { Items, Notif } from "../models/index";

export let itemsStore = writable([]);
export let itemsLastUpdateStore = writable(0);
export let auth = writable("");
export let logged = writable(false);
export let notification: Writable<Notif> = writable({});
export let currentBarcodes: Writable<Array<string>> = writable([]);
export let currentItems: Writable<Items> = writable({
    lastUpdate: "",
    data: [],
});
export let syncing = writable(false);

export const getCurrentBarcodes = () => {
    //get current barcodes from local storage
    const barcodes = localStorage.getItem("barcodes");
    currentBarcodes.set(barcodes ? JSON.parse(barcodes) : []);
    // subscibe to current barcodes
    currentBarcodes.subscribe((value) => {
        localStorage.setItem("barcodes", JSON.stringify(value));
    })
    
}

export const getItems = async() => {
    syncing.set(true);
    const response = await fetch("/api/items");
    const data = await response.json();
    if (data.error) {
        console.log("error", data.error);
        notification = {
            type: "variant-filled-warning",
            body: data.error,
            show: true,
        };
         

    } else {
    syncing.set(false);
    return data;
    }
}

export const getCurrentItems = async() => {
    // if local storage is empty, set it to empty array
    if (!localStorage.getItem("items")) {
        let items = getItems();
        items.then((data) => {
            currentItems.set({lastUpdate: new Date().toISOString(), data: data});
        })
        // save to local storage
        localStorage.setItem("items", JSON.stringify(currentItems));

    }
    //get current items from local storage
    const items = localStorage.getItem("items");
    currentItems.set(items ? JSON.parse(items) : []);
    // subscribe to current items
    currentItems.subscribe((value) => {
        localStorage.setItem("items", JSON.stringify(value));
    })
}

export const getAuth = () => {
    auth = writable(localStorage.getItem("auth") || "");
    if (get(auth) === env.PUBLIC_PASSWORD) {
        logged.set(true);
    }
}

export const login = (password: string) => {
    if (password === env.PUBLIC_PASSWORD) {
        // set session storage
        localStorage.setItem("auth", password);
        auth.set(password);
        logged.set(true);
        return true;
    }
}

export const logout = () => {
    localStorage.removeItem("auth");
    auth.set("");
    logged.set(false);
}