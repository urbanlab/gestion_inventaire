<script lang="ts">
	import Basket from '$lib/components/Basket.svelte';
    import { onMount } from 'svelte';

    let currentBarcode = '';
	let items;

	onMount( async () => {
		document.title = 'Emprunt';
		// get items from localStorage
		items = JSON.parse(window.localStorage.getItem('items'));
	});
	
</script>
<section>
    {#if items}
		<Basket items={items} currentBarcode={currentBarcode} />
	{:else}
		Loading ...
	{/if}
</section>