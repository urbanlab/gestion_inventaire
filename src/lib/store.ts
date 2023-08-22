import { get, writable } from "svelte/store";
import { env } from '$env/dynamic/public';
import type { Notif } from '../models/notification';

export let itemsStore = writable([]);
export let itemsLastUpdateStore = writable(0);
export let auth = writable("");
export let logged = writable(false);
export const notification = writable({} as Notif);


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