import { writable } from "svelte/store";

export const query = writable("");
export const settings = writable({
    language: "en",
});