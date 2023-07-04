<script lang="ts">
	import { InputChip } from '@skeletonlabs/skeleton';
	import { SlideToggle, ProgressBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import type { Item } from '../../models/item';
	
	export let items: any;
	export let currentBarcodes: Array<string> = [];
	let itemsBasket: any[] = [];
	let io = true; // io = input / output
	let projet = '';

	let updating = false;
	
	onMount(async () => {
		document.title = 'Emprunt';
		// get items from localStorage
		items = JSON.parse(window.localStorage.getItem('items'));
		console.log('items', items);
	});

	// Filter itemsBasket from currentBarcodes string array
	$: itemsBasket = items.data.filter((item) => currentBarcodes.includes(item.id_code_barre));


	function submitBasket(projet: string) {
		// for each item in itemsBasket change the projet in the localStorage
		itemsBasket.forEach((item : Item) => {
			updating = true;
			console.log('submitBasket', updating);
			item.projet = projet;
			item.utilisation = io ? 'Dispo' : 'Prêt partenaire';

			// update on route api/item[id]
			fetch(`/api/item/${item.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(item),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Success:', data);
					updating = false;	
					
				})
				.catch((error) => {
					console.error('Error:', error);
					updating = true;
				});

		});
		// save items in localStorage
		window.localStorage.setItem('items', JSON.stringify(items));

		// reset currentBarcodes
		currentBarcodes = [];

		// reset itemsBasket
		itemsBasket = [];

		// Reset inputeload items from localStorage
		items = JSON.parse(window.localStorage.getItem('items'));

	}
</script>

<section class="w-screen">
	{#if updating}
		<div class="relative">
			<h1>Mise à jour des elements en base</h1>
			<ProgressBar label="Progress Bar" value={undefined}/>
		</div>
	{/if}
	
	<div class="card p-4 {updating ? "opacity-5" : ""}">
		<h1 class="">Emprunt</h1>
		<div class="card flex  mb-5">
			<div class="p-4">
				<h3>Entrée Code barre</h3>
				<p><i>Scannez le code bare du bien a l'aide du scanner usb ou avec une webcam</i></p>
				<InputChip 
					name="chips" 
					bind:value={currentBarcodes}
				/>
			</div>
			<div class=" p-4">
				<h3>Entrée / Sortie</h3>
				<SlideToggle name="slider-example" bind:checked={io}>{io ? 'entrée' : 'sortie'}</SlideToggle>
			</div>
			<div class=" p-4">
				<h3>Projet</h3>
				<p><i>La personne ou structure</i></p>
				<input class="textarea" type="text" bind:value={projet} placeholder="projet" />
			</div>
			<div class=" p-4">
				<button 
					class="btn  bg-primary-500" 
					on:click={
						() => {
							submitBasket(projet);
						}
					}>
					Valider
				</button>
			</div>
		</div>
		<div>
			{#if itemsBasket}
				<div class="h-1/3 overflow-y-scroll table-container">
					<table class="table-auto table table-hover">
						<thead>
							<tr>
								<th>code barre</th>
								<th>desc</th>
								<th>projet</th>
								<th>utilisation</th>
								<th>quantité totale</th>
								<th>infos utiles</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{#each itemsBasket as item, i}
								<tr>
									<td>{item.id_code_barre}</td>
									<td>{item.descriptif}</td>
									<td>{item.projet}</td>
									<td>{item.utilisation}</td>
									<td>{item.quantite_totale}</td>
									<td>{item.infos_utiles}</td>
									<td
									on:click={() => {
										// based on item.id_code_barre remove item from currentBarcodes
										currentBarcodes = currentBarcodes.filter((barcode) => barcode !== item.id_code_barre);
									}}>Supprimer</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<p>aucun item selectioné</p>
			{/if}
		</div>
	</div>
</section>
