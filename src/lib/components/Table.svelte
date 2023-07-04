<script lang="ts">
	export let items: any;

	function searchDesc(e) {
		items.data = JSON.parse(window.localStorage.getItem('items')).data;
		const input = e.target.value;
		console.log('searchDesc');
		// filter items.data.description with inputù
		items.data = items.data.filter((item) => item?.descriptif?.includes(input));
	}
</script>

<section class="overflow-y-scroll ">
	{#if items?.data}
        <div class="fixed bg-slate-500 w-full p-5">
            <h1>Recherche</h1>
            <input
				class="text-black"
                type="text"
                on:input={(e) => {
                    searchDesc(e);
                }}
            />
        </div>
		<div class="table-container w-screen">
			<table class="table table-hover table-compact mt-24">
				<thead>
					<tr>
						<th>desc</th>
						<th>projet</th>
						<th>utilisation</th>
						<th>quantité totale</th>
						<th>infos utiles</th>
					</tr>
				</thead>
				<tbody>
					{#each items.data.slice(0, 100) as item}
						<tr>
							<td>{item.descriptif}</td>
							<td>{item.projet}</td>
							<td>{item.utilisation}</td>
							<td>{item.quantite_totale}</td>
							<td>{item.infos_utiles}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p>loading...</p>
	{/if}
</section>
