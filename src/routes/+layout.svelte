<script>
  	import { json } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
  	import { getAuth, logged, login, logout } from '$lib/store';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa'
	import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

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

	let password = '';

	onMount(() => {
		getAuth();
		document.title = 'Emprunt';
		if (doNotsync) {
			console.log('doNotsync');
			items = JSON.parse(window.localStorage.getItem('items'));
		} else {
			setLocalStorage();
		}
	});

	async function fetchItems() {
		syncing = true;
		const response = await fetch('/api/items');
		const data = await response.json();
		syncing = false;
		return data;
	}

	function setLocalStorage() {
		const itemsLocalStorage = window.localStorage.getItem('items');
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
					console.log('items in localStorage but older than ', itemRefreshTime, ' minutes');
					// fetch api/items and save it in localStorage with items.data and itemslastUpdate
					// fetch('http://localhost:3000/api/items')

					const data = await fetchItems();
					items.data = data;
					items.lastUpdate = new Date().toString();
					window.localStorage.setItem('items', JSON.stringify(items));
				} else {
					console.log('items in localStorage and younger than ', itemRefreshTime, ' minutes');
				}
			} else {
				console.log('no items in localStorage');
				// fetch api/items and save it in localStorage with items.data and itemslastUpdate

				const data = await fetchItems();
				items = {
					data: data,
					lastUpdate: new Date().toString()
				};
				window.localStorage.setItem('items', JSON.stringify(items));
			}
			setLocalStorage();
		}, 5000);
	}

</script>
<div class="flex flex-col">
	{#if !$logged}
		<input type="text" placeholder="mot de passe" bind:value={password} />
		<button on:click={() => login(password)}>login</button>
	{/if}
	{#if $logged}
		<button on:click={() => logout()}>logout</button> 
		<p>{syncing ? "syncronisation en cours" : "aucune synchronisation"}</p>
		<span class="badge-icon variant-filled">{syncing}</span>
		{#if firstUpdate}
			<div class="relative">
				<h1>Mise en cache des items de la techshop</h1>
				<p>La première fois, cela peut prendre plusieurs minutes</p>
				<ProgressBar label="Progress Bar" value={undefined}/>
			</div>
		{/if}
		<div class="{firstUpdate ? "opacity-5" : ""}">
			<slot/>
			<Nav/>
		</div>
	{/if}
	
</div>
