<script lang="ts">
	import Table from '$lib/components/Table.svelte';
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
        <Table items={items} />
    {:else}
        Loading ...
    {/if}
</section>