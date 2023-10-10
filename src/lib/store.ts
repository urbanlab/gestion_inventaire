import { get, writable } from "svelte/store";
import { env } from '$env/dynamic/public';
import type { Notif } from '../models/notification';

export let itemsStore = writable([]);
export let itemsLastUpdateStore = writable(0);
export let auth = writable("");
export let logged = writable(false);
export const notification = writable({} as Notif);
export let currentBarcodes = writable([] as Array<string>);

export const getCurrentBarcodes = () => {
    //get current barcodes from local storage
    const barcodes = localStorage.getItem("barcodes");
    currentBarcodes.set(barcodes ? JSON.parse(barcodes) : []);
    
}

export const setCurrentBarcodes = (barcodes: Array<string> | null) => {
    //set current barcodes to local storage
    localStorage.setItem("barcodes", JSON.stringify(barcodes));
    currentBarcodes.set(barcodes || []);
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