<script lang="ts">
  import { InputChip } from "@skeletonlabs/skeleton";

	export let items: any;

	function searchDesc(e) {
		items.data = JSON.parse(window.localStorage.getItem('items')).data;
		const input = e.target.value;
		console.log('searchDesc');
		
		// filter items.data.description with input
		items.data = items.data.filter((item) => item?.descriptif?.toLowerCase().includes(input.toLowerCase()));
		}
</script>

<section class="overflow-y-scroll ">
	{#if items?.data}
        <div class="card rounded-b-none fixed w-full p-5">
            <h1 class="mb-4">Recherche</h1>
			<InputChip
				name="search"
				on:input={(e) => {
					searchDesc(e);
				}}
			/>
        </div>
		<div class="table-container w-screen">
			<table class="table table-hover table-compact mt-40 ">
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
